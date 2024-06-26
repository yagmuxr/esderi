// src/components/Categories/CreateCategoryPage.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateCategoryPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleCreateCategory = async (values) => {
        try {
            const response = await fetch(`${apiUrl}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Category created successfully!");
                navigate('/admin/categories');
            } else {
                const errorData = await response.json();
                message.error(`Failed to create category: ${errorData.error}`);
            }
        } catch (error) {
            message.error("Failed to fetch: " + error.message);
            console.error("Failed to fetch:", error);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateCategory}
            style={{ maxWidth: 600, margin: '0 auto' }}
        >
            <Form.Item
                name="name"
                label="Category Name"
                rules={[{ required: true, message: 'Please enter the category name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="img"
                label="Image URL"
                rules={[{ required: true, message: 'Please enter the image URL' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create Category
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateCategoryPage;
