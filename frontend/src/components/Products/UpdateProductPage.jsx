// src/components/Products/UpdateProductPage.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Space, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateProductPage = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        form.setFieldsValue({
          ...data,
          description: data.description || "",
          img: data.img.length > 0 ? data.img : [""],
          colors: data.colors.length > 0 ? data.colors : [""]
        });
      } else {
        const errorData = await response.json();
        message.error(`Failed to fetch product: ${errorData.error}`);
      }
    } catch (error) {
      message.error("Failed to fetch: " + error.message);
      console.error("Failed to fetch:", error);
    }
  };

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

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Product updated successfully!');
        navigate('/admin/products');
      } else {
        const errorData = await response.json();
        message.error(`Failed to update product: ${errorData.error}`);
      }
    } catch (error) {
      message.error("Failed to update product: " + error.message);
      console.error("Failed to update product:", error);
    }
    setLoading(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Please input the product name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <ReactQuill theme="snow" />
      </Form.Item>
      <Form.Item
        label="Current Price"
        name={['price', 'current']}
        rules={[{ required: true, message: 'Please input the current price!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Discount Price"
        name={['price', 'discount']}
      >
        <Input />
      </Form.Item>
      <Form.List name="img" rules={[{ validator: async (_, img) => {
          if (!img || img.length < 1 || img[0] === "") {
            return Promise.reject(new Error('Please input at least one image URL!'));
          }
        } }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name]}
                  fieldKey={[fieldKey]}
                  rules={[{ required: true, message: 'Please input an image URL!' }]}
                >
                  <Input placeholder="Image URL" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Image
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.List name="colors" rules={[{ validator: async (_, colors) => {
          if (!colors || colors.length < 1 || colors[0] === "") {
            return Promise.reject(new Error('Please input at least one color!'));
          }
        } }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name]}
                  fieldKey={[fieldKey]}
                  rules={[{ required: true, message: 'Please input a color!' }]}
                >
                  <Input placeholder="Color" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Color
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select>
          {categories.map(category => (
            <Select.Option key={category.name} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Text Overlay"
        name="textOverlay"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProductPage;
