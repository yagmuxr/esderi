// src/components/Categories/UpdateCategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

const UpdateCategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/categories/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    form.setFieldsValue(data);
                } else {
                    const errorData = await response.json();
                    message.error(`Failed to fetch category: ${errorData.error}`);
                }
            } catch (error) {
                message.error("Failed to fetch: " + error.message);
                console.error("Failed to fetch:", error);
            }
        };

        fetchCategory();
    }, [id, apiUrl, form]);

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${apiUrl}/api/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Category updated successfully!");
                navigate("/admin/categories");
            } else {
                const errorData = await response.json();
                message.error(`Failed to update category: ${errorData.error}`);
            }
        } catch (error) {
            message.error("Failed to update: " + error.message);
            console.error("Failed to update:", error);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ name: "", img: "" }}
        >
            <Form.Item
                label="Category Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the category name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Image URL"
                name="img"
                rules={[{ required: true, message: 'Please enter the image URL' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Category
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UpdateCategoryPage;
