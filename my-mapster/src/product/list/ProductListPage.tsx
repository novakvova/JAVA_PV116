import {Link} from "react-router-dom";
import {Button, Col, Row} from "antd";
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";
import {IProductItem} from "./types.ts";
import http_common from "../../http_common.ts";

const ProductListPage = () => {


    const [list, setList] = useState<IProductItem[]>([]);


    useEffect(() => {
        http_common.get<IProductItem[]>("/api/products")
            .then(resp => {
                console.log("Get products", resp.data);
                setList((resp.data));
            });
    }, []);


    return (
        <>
            <h1>Список продуктів</h1>
            <Link to={"/products/create"}>
                <Button type="primary">
                    Додати
                </Button>
            </Link>



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

        </>
    );
}

export default ProductListPage;