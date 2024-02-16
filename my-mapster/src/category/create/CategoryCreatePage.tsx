//import {useNavigate} from "react-router-dom";
import {ICategoryCreate} from "./types.ts";
import {Form, Input, Row} from "antd";

const CategoryCreatePage = () => {
    //const navigate = useNavigate();

    const [form] = Form.useForm<ICategoryCreate>();

    const onHandlerSubmit = async (values: ICategoryCreate) => {
        console.log("Form submit", values);
    }

    return (
        <>
            <h1>Додати категорію</h1>
            <Row gutter={16}>
                <Form form={form}
                      onFinish={onHandlerSubmit}
                      layout={"vertical"}>

                    <Form.Item
                        label={"Назва"}
                        name={"name"}
                        htmlFor={"name"}
                        rules = {[
                            {required: true, message: "Це поле є обов'язковим!"},
                            {min: 3, message: "Довжина поля 3 символи"}
                        ]}
                    >
                        <Input autoComplete = "name"/>
                    </Form.Item>
                </Form>
            </Row>
        </>
    );
}

export default CategoryCreatePage;