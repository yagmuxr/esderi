// src/pages/admin/AdminUserPage.jsx
import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm } from "antd";

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                const errorData = await response.json();
                message.error(`Failed to fetch users: ${errorData.error}`);
            }
        } catch (error) {
            message.error("Failed to fetch: " + error.message);
            console.error("Failed to fetch:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (email) => {
        try {
            const response = await fetch(`${apiUrl}/api/users/${email}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                message.success("User deleted successfully!");
                fetchUsers(); 
            } else {
                const errorData = await response.json();
                message.error(`Failed to delete user: ${errorData.error}`);
            }
        } catch (error) {
            message.error("Failed to delete: " + error.message);
            console.error("Failed to delete:", error);
        }
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => <img src={text} alt="avatar" style={{ width: '50px', borderRadius: '50%' }} />
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Kullanıcıyı Sil"
                    description="Kullanıcıyı silmek istediğinizden emin misiniz?"
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={() => deleteUser(record.email)}
                >
                    <Button type="primary" danger>Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Table dataSource={users} columns={columns} rowKey="_id" />
    );
}

export default AdminUserPage;
