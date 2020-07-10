import { Layout, Menu } from 'antd';
import React from 'react';
import {UserBookstore} from "../components/user_bookstore";
import {Cart} from "../components/Cart";
import {Order} from "../components/order";
import {CustomerExcel} from "../components/customerExcel";
import "../css/HomeView.css";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function ShowMe(props){
    const showing = props.showing;
    switch (showing) {
        case "Books":
            return <UserBookstore />;
        case "Cart":
            return <Cart />;
        case "Order":
            return <Order />;
        case "CustomerExcel":
            return <CustomerExcel />;
        default:
            return;
    }
}

export class homeView extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            showing : "Books",
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    bookOnClick = () => {
        this.setState({
            showing:"Books",
            });
    };

    cartOnClick = () => {
        this.setState({
            showing:"Cart",
            });
    };

    orderOnClick = () => {
        this.setState({
            showing:"Order",
        });
    };

    customerExcelOnClick = () => {
        this.setState({
            showing:"CustomerExcel",
        });
    };

    render() {
        const show = this.state.showing;
        return (

            <Layout className="container">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={this.bookOnClick}>
                            <UserOutlined />
                            <span>Books</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.cartOnClick}>
                            <VideoCameraOutlined />
                            <span>Cart</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.orderOnClick}>
                            <UploadOutlined />
                            <span>Order</span>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={this.customerExcelOnClick}>
                            <UploadOutlined />
                            <span>customer</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                    <ShowMe showing = {show} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

