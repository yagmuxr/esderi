import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateProductPage = () => {
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const onFinish = async (values) => {
    const productData = {
      ...values,
      description, // Add description separately
    };

    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        message.success('Product created successfully!');
        form.resetFields();
        setDescription(''); // Reset the description field
      } else {
        const errorData = await response.json();
        message.error(`Failed to create product: ${errorData.error}`);
      }
    } catch (error) {
      message.error("Failed to create product: " + error.message);
      console.error("Failed to create product:", error);
    }
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
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <ReactQuill theme="snow" value={description} onChange={setDescription} />
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
        if (!img || img.length < 1) {
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
                  fieldKey={[fieldKey, 'field']}
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
        if (!colors || colors.length < 1) {
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
                  fieldKey={[fieldKey, 'field']}
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
        <Button type="primary" htmlType="submit">
          Create Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductPage;
