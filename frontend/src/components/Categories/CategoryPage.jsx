// src/components/Categories/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/categories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                const errorData = await response.json();
                message.error(`Failed to fetch categories: ${errorData.error}`);
            }
        } catch (error) {
            message.error("Failed to fetch: " + error.message);
            console.error("Failed to fetch:", error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                message.success("Category deleted successfully!");
                fetchCategories(); // Refresh categories after deletion
            } else {
                const errorData = await response.json();
                message.error(`Failed to delete category: ${errorData.error}`);
            }
        } catch (error) {
            message.error("Failed to delete: " + error.message);
            console.error("Failed to delete:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'img',
            render: (text) => <img src={text} alt="category" style={{ width: '50px' }} />
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Link to={`/admin/categories/${record._id}`}>
                        <Button type="primary" style={{ marginRight: '8px' }}>Edit</Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => deleteCategory(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Link to="/admin/create-category">
                    <Button type="primary">Add Category</Button>
                </Link>
            </div>
            <Table dataSource={categories} columns={columns} rowKey="_id" />
        </div>
    );
}

export default CategoryPage;
