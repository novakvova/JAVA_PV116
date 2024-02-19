import {Button, Popconfirm, Table} from "antd";
import {Link} from "react-router-dom";
import {ColumnsType} from "antd/es/table";
import {ICategoryItem} from "../types.ts";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {APP_ENV} from "../../env";
import http_common from "../../http_common.ts";

const CategoryListPage = () => {
    const imgURL = APP_ENV.BASE_URL + "/uploading/150_";

    const columns: ColumnsType<ICategoryItem> = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (imageName: string) => (
                <img src={`${imgURL}${imageName}`} alt="Category Image"/>
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_, record) => (
                <Link to={`/category/edit/${record.id}`}>
                    <Button type="primary" icon={<EditOutlined/>}>
                        Змінить
                    </Button>
                </Link>

            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, record) => (

                <Popconfirm
                    title="Are you sure to delete this category?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined/>}>
                        Delete
                    </Button>
                </Popconfirm>

            ),
        },
    ];

    const [data, setData] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http_common.get("/api/categories");
                console.log("response.data", response.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (categoryId: number) => {
        try {
            await http_common.delete(`/api/categories/${categoryId}`);
            setData(data.filter(x => x.id != categoryId));
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    };

    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/category/create"}>
                <Button type="primary" style={{margin: '5px'}}>
                    ADD +
                </Button>
            </Link>

            <Table columns={columns} rowKey={"id"} dataSource={data} size="middle"/>
        </>
    );
}

export default CategoryListPage;