import {Button, Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';

const {Header} = Layout;

const items1 = ['Home', 'Add'].map((key) => ({
    key,
    label: `${key}`,
    link: key.toLowerCase(), // Add a link property based on the item key
}));


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
                {items1.map((item) => (
                    <Menu.Item key={item.link}>
                        <Link to={`/${item.link}`}>{item.label}</Link>
                    </Menu.Item>
                ))}
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

