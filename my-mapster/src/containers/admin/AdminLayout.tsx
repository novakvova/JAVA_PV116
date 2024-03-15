import {Breadcrumb, Layout, theme} from "antd";
import AdminHeader from "./AdminHeader";
import AdminSider from "./AdminSider";
import {Outlet} from "react-router-dom";
import "./AdminLayout.css"

const {Content, Footer} = Layout;

const AdminLayout = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    return (
        <Layout style={{minHeight: '100vh'}}>
            <AdminSider/>
            <Layout>
                <AdminHeader/>
                <Content style={{padding: '0 48px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}
                    >

                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Outlet/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center', bottom: "0", right: "0", left: "0"}}>Ant Design ©2023 Created by
                    Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout;