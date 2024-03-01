import {Link, useSearchParams} from "react-router-dom";
import {Button, Col, Collapse, Form, Input, Pagination, Row} from "antd";
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";
import {IGetProducts, IProductSearch} from "./types.ts";
import http_common from "../../http_common.ts";

const ProductListPage = () => {
    const [data, setData] = useState<IGetProducts>({
        list: [],
        totalCount: 0
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [formParams, setFormParams] = useState<IProductSearch>({
        name: searchParams.get('name') || "",
        description: searchParams.get('name') || "",
        category: searchParams.get('category') || "",
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 3
    });

    const [form] = Form.useForm<IProductSearch>();

    const onSubmit = async (values: IProductSearch) => {
        findProducts({
            ...formParams,
            page: 1,
            name: values.name,
            category: values.category,
            description: values.description
        });
    }

    useEffect(() => {
        http_common.get<IGetProducts>("/api/products/search",
            {
                params: {
                    ...formParams,
                    page: formParams.page - 1
                }
            })
            .then(resp => {
                console.log("Get products", resp.data);
                setData((resp.data));
            });
    }, [formParams]);

    const {list, totalCount} = data;

    const handlePageChange = async (page: number, newPageSize: number) => {
        findProducts({...formParams, page, size: newPageSize});
    };

    const findProducts = (model: IProductSearch) => {
        setFormParams(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params: IProductSearch) => {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0) {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };
    return (
        <>
            <h1>Список продуктів</h1>
            <Link to={"/products/create"}>
                <Button type="primary">
                    Додати
                </Button>
            </Link>

            <Collapse defaultActiveKey={0}>
                <Collapse.Panel key={1} header={"Search Panel"}>
                    <Row gutter={16}>
                        <Form form={form}
                              onFinish={onSubmit}
                              layout={"vertical"}
                              style={{
                                  minWidth: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  padding: 20,
                              }}
                        >
                            <Form.Item
                                label="Назва"
                                name="name"
                                htmlFor="name"
                            >
                                <Input autoComplete="keyword"/>
                            </Form.Item>

                            <Form.Item
                                label="Опис"
                                name="description"
                                htmlFor="description"
                            >
                                <Input autoComplete="keyword"/>
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="category"
                                htmlFor="category"
                            >
                                <Input autoComplete="keyword"/>
                            </Form.Item>

                            <Row style={{display: 'flex', justifyContent: 'center'}}>
                                <Button style={{margin: 10}} type="primary" htmlType="submit">
                                    Пошук
                                </Button>
                                <Button style={{margin: 10}} htmlType="button" onClick={() => {
                                }}>
                                    Cancel
                                </Button>
                            </Row>
                        </Form>
                    </Row>
                </Collapse.Panel>

            </Collapse>

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        console.log("range ", range);
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={(formParams.page)}
                    pageSize={formParams.size}
                    total={totalCount}
                    onChange={handlePageChange}
                    pageSizeOptions={[3, 6, 12, 24]}
                    showSizeChanger
                />
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {list.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            list.map((item) =>
                                <ProductCard key={item.id} {...item} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        console.log("range ", range);
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={(formParams.page)}
                    pageSize={formParams.size}
                    total={totalCount}
                    onChange={handlePageChange}
                    pageSizeOptions={[3, 6, 12, 24]}
                    showSizeChanger
                />
            </Row>

        </>
    );
}

export default ProductListPage;