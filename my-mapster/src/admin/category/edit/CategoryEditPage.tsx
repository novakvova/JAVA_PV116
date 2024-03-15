import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, Row, Upload, UploadFile} from "antd";
import {ICategoryEdit, ICategoryItem, IUploadedFile} from "../types.ts";
import TextArea from "antd/es/input/TextArea";
import {UploadChangeParam} from "antd/es/upload";
import {PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import http_common from "../../../http_common.ts";
import {APP_ENV} from "../../../env";

const CategoryEditPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [form] = Form.useForm<ICategoryEdit>();
    const [file, setFile] = useState<UploadFile | null>();

    const onSubmit = async (values: ICategoryEdit) => {
        try {
            await http_common.put("/api/categories", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin');
        } catch (ex) {
            console.log("Exception create category", ex);
        }
    }

    useEffect(() => {
        http_common.get<ICategoryItem>(`/api/categories/${id}`)
            .then(resp => {
                const {data} = resp;
                form.setFieldsValue(data);
                setFile(
                    {
                        uid: '-1',
                        name: data.image,
                        status: 'done',
                        url: `${APP_ENV.BASE_URL}/uploading/150_${data.image}`,
                    });
            })
            .catch(error => {
                console.log("Error server ", error);
            });
    }, [id]);


    return (
        <>
            <h1>Редагування категорію</h1>
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
                        name="id"
                        hidden
                    />

                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Опис"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 10, message: 'Опис повинен містити мінімум 10 символів!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        name="file"
                        label="Фото"
                        valuePropName="file"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                            fileList={file ? [file] : []}
                            onChange={(data)=> {
                                setFile(data.fileList[0]);
                            }}

                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Обрати нове фото</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Зберегти
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() => {
                            navigate('/')
                        }}>
                            Скасувати
                        </Button>
                    </Row>
                </Form>
            </Row>


        </>
    )
}

export default CategoryEditPage;