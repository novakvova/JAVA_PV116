import {Avatar, Button, Layout, Menu} from 'antd';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logout} from "../../store/accounts/accounts.slice.ts";
import ButtonGroup from "antd/es/button/button-group";
import {UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import {APP_ENV} from "../../env";

const {Header} = Layout;

const DefaultHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {isLogin, user} = useAppSelector(state => state.account);

    const handleLogout = () => {
        //console.log("Logout user");
        dispatch(logout());
        navigate("/");
    };

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
                        {/*<Link to={`/product`}>Продукти</Link>*/}
                    </Menu.Item>
            </Menu>

            {isLogin ? (
                <ButtonGroup size="large">
                    <Button
                        type="primary"
                        style={{display: 'flex'}}
                        icon={<Avatar  size="small" src={`${APP_ENV.BASE_URL}images/${user?.name}`}/>}
                    >
                        {user?.name}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined/>}
                        onClick={() => handleLogout()}
                    />
                </ButtonGroup>

            ) : (
                <Link to="/login" style={{color: 'inherit', textDecoration: 'none'}}>
                    <Button type="primary" icon={<UserOutlined/>}>
                        Увійти
                    </Button>
                </Link>
            )}

        </Header>
    );
};

export default DefaultHeader;

