import {Button, Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';

const {Header} = Layout;


const ButtonStyle = {
    margin: '0 10px 0 0',
};
const DefaultHeader = () => {
    const location = useLocation();


    return (
        <Header style={{display: 'flex', alignItems: 'center'}}>
            <div className="demo-logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]} // Highlight the selected menu item
                style={{flex: 1, minWidth: 0}}
            >
                    <Menu.Item key={"products"}>
                        <Link to={`/product`}>Продукти</Link>
                    </Menu.Item>
            </Menu>

            <>
                <Link to={"/login"}>
                    <Button style={ButtonStyle}>
                        Sign-In
                    </Button>
                </Link>
                <Link to={"/register"}>
                    <Button>Register</Button>
                </Link>
            </>

        </Header>
    );
};

export default DefaultHeader;

