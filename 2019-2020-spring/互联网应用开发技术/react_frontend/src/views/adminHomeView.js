import { Layout, Menu } from 'antd';
import React from 'react';
import {EditableTable} from "../components/bookstore";
import {AdminOrder} from "../components/adminOrder";
import "../css/HomeView.css";
import {Profile} from "../components/profile";
import {AdminSaleExcel} from "../components/adminSaleExcel";
import {AdminUserExcel} from "../components/adminUserExcel";
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
            return <EditableTable />;
        case "Order":
            return <AdminOrder />;
        case "Profile":
            return <Profile />;
        case "saleExcel":
            return <AdminSaleExcel/>;
        case "userExcel":
            return <AdminUserExcel/>;
        default:
            return;
    }
}

export class adminHomeView extends React.Component{
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


    profileOnClick = () => {
        this.setState({
            showing:"Profile",
        });
    };

    orderOnClick = () => {
        this.setState({
            showing:"Order",
        });
    };

    saleExcelOnClick = () => {
        this.setState({
            showing:"saleExcel",
        });
    };

    userExcelOnClick = () => {
        this.setState({
            showing:"userExcel",
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
                        <Menu.Item key="2" onClick={this.profileOnClick}>
                            <UploadOutlined />
                            <span>Profile</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.orderOnClick}>
                            <UploadOutlined />
                            <span>Order</span>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={this.saleExcelOnClick}>
                            <UploadOutlined />
                            <span>Sale</span>
                        </Menu.Item>
                        <Menu.Item key="5" onClick={this.userExcelOnClick}>
                            <UploadOutlined />
                            <span>User</span>
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
//
// ReactDOM.render(<SiderDemo />, mountNode);
