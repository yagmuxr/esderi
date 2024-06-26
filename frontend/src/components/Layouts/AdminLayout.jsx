import React from 'react';
import PropTypes from 'prop-types';
import { Button, Layout, Menu } from 'antd';
import { DashboardOutlined, TagsOutlined, AppstoreOutlined, GiftOutlined, UserOutlined, ShoppingOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';

const { Sider, Content, Header } = Layout;

const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.role : null;
}

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const userRole = getUserRole();

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => {
                navigate('/admin');
            },
        },
        {
            key: 'categories',
            icon: <AppstoreOutlined />,
            label: 'Kategoriler',
            onClick: () => {
                navigate('/admin/categories');
            },
        },
        {
            key: 'products',
            icon: <TagsOutlined />,
            label: 'Ürünler',
            onClick: () => {
                navigate('/admin/products');
            },
        },
        {
            key: 'coupons',
            icon: <GiftOutlined />,
            label: 'Kuponlar',
            onClick: () => {
                navigate('/admin/coupons');
            },
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: 'Kullanıcı Listesi',
            onClick: () => {
                navigate('/admin/users');
            },
        },
        {
            key: 'orders',
            icon: <ShoppingOutlined />,
            label: 'Siparişler',
            onClick: () => {
                navigate('/admin/orders');
            },
        },
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: 'Ana Sayfa',
            onClick: () => {
                navigate('/');
            },
        },
    ];

    if (userRole === "admin") {
        return (
            <Layout className="admin-layout" style={{ minHeight: "100vh" }}>
                <Sider theme="dark" width={200}>
                    <Menu mode="vertical" style={{ height: '100%' }} items={menuItems.map(item => ({ key: item.key, icon: item.icon, label: item.label, onClick: item.onClick }))} />
                </Sider>
                <Layout>
                    <Header>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
                            <h2>Admin Paneli</h2>
                        </div>
                    </Header>
                    <Content>
                        <div className='site-layout-background' style={{ padding: '24px', minHeight: 360 }}>
                            {children || <Outlet />}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    } else {
        return (window.location.href = "/");
    }
};

AdminLayout.propTypes = {
    children: PropTypes.node,
};

export default AdminLayout;
