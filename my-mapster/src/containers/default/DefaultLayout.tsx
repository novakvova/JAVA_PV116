import {Breadcrumb, Layout, theme} from "antd";
import DefaultHeader from "./DefaultHeader";
import DefaultSider from "./DefaultSider";
import {Outlet} from "react-router-dom";

const { Content, Footer} = Layout;

const DefaultLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <DefaultHeader/>

            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    <DefaultSider/>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center', bottom: "0", right: "0", left: "0"}}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
}

export default DefaultLayout;