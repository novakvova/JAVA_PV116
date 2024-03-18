import {Button, Col, Form, Input, Pagination, Row} from "antd";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import http_common from "../../http_common.ts";
import CategoryCard from "./CategoryCard.tsx";
import {ICategorySearch, IGetCategories} from "../../admin/category/types.ts";

const HomePage = () => {

    const [data, setData] = useState<IGetCategories>({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [formParams, setFormParams] = useState<ICategorySearch>({
        name: searchParams.get('name') || "",
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 1
    });

    const [form] = Form.useForm<ICategorySearch>();

    const onSubmit = async (values: ICategorySearch) => {
        findCategories({...formParams, page: 1, name: values.name});
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('server request-------------');
                const response = await http_common.get<IGetCategories>("/api/categories/search",
                    {
                        params: {
                            ...formParams,
                            page: formParams.page-1
                        }
                    });
                console.log("response.data", response.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchData();
    }, [formParams]);

    const {content, totalElements, number } = data;

    const handleDelete = async (categoryId: number) => {
        try {
            await http_common.delete(`/api/categories/${categoryId}`);
            setData({ ...data, content: content.filter(x => x.id != categoryId)});
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    };

    const handlePageChange = async (page: number, newPageSize: number) => {
        findCategories({...formParams, page, size: newPageSize});
    };

    const findCategories = (model: ICategorySearch) => {
        setFormParams(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params : ICategorySearch) =>{
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0 && value!="") {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };


    return (
        <>
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
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Пошук
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() =>{ }}>
                            Скасувати
                        </Button>
                    </Row>
                </Form>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {content.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            content.map((item) =>
                                <CategoryCard key={item.id} item={item} handleDelete={handleDelete} />,
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
                    current={(number+1)}
                    defaultPageSize={formParams.size}
                    total={totalElements}
                    onChange={handlePageChange}
                    pageSizeOptions={[1, 2, 5, 10]}
                    showSizeChanger
                />
            </Row>
        </>
    );
}

export default HomePage;