// src/components/Coupons/CouponPage.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Form, Input, Modal } from 'antd';

const CouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`);
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      message.error('Failed to fetch coupons');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/api/coupons/${id}`, { method: 'DELETE' });
      message.success('Coupon deleted successfully');
      fetchCoupons();
    } catch (error) {
      message.error('Failed to delete coupon');
    }
  };

  const handleFinish = async (values) => {
    const { code, discountPercent } = values;
    const payload = { code, discountPercent };

    try {
      if (editingCoupon) {
        await fetch(`${apiUrl}/api/coupons/${editingCoupon._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        message.success('Coupon updated successfully');
      } else {
        await fetch(`${apiUrl}/api/coupons`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        message.success('Coupon created successfully');
      }
      fetchCoupons();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to save coupon');
    }
  };

  const openModal = (coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      form.setFieldsValue(coupon);
    } else {
      setEditingCoupon(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount Percent',
      dataIndex: 'discountPercent',
      key: 'discountPercent',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => openModal(record)} style={{ marginRight: 10 }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this coupon?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => openModal(null)} style={{ marginBottom: 20 }}>
        Create Coupon
      </Button>
      <Table dataSource={coupons} columns={columns} rowKey="_id" loading={loading} />
      <Modal
        title={editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: 'Please input the coupon code!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Discount Percent"
            name="discountPercent"
            rules={[{ required: true, message: 'Please input the discount percent!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              {editingCoupon ? 'Update' : 'Create'}
            </Button>
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponPage;
