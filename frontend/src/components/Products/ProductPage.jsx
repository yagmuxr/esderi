import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        const errorData = await response.json();
        message.error(`Failed to fetch products: ${errorData.error}`);
      }
    } catch (error) {
      message.error("Failed to fetch: " + error.message);
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        message.success("Product deleted successfully!");
        fetchProducts(); // Refresh product list
      } else {
        const errorData = await response.json();
        message.error(`Failed to delete product: ${errorData.error}`);
      }
    } catch (error) {
      message.error("Failed to delete: " + error.message);
      console.error("Failed to delete:", error);
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <div>
          <p>Current: ${price.current}</p>
          {price.discount && <p>Discount: ${price.discount}</p>}
        </div>
      ),
    },
    {
      title: "Images",
      dataIndex: "img",
      key: "img",
      render: (images) =>
        images.map((src, index) => (
          <a key={index} href={src} target="_blank" rel="noopener noreferrer">
            <img
              src={src}
              alt="product"
              style={{ width: "50px", marginRight: "5px" }}
            />
          </a>
        )),
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (colors) => colors.join(", "),
    },
    {
      title: "Text Overlay",
      dataIndex: "textOverlay",
      key: "textOverlay",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/admin/products/${record._id}`}>
            <Button type="primary" style={{ marginRight: "10px" }}>
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => deleteProduct(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin/products/create">
          <Button type="primary">Create Product</Button>
        </Link>
      </div>
      <Table dataSource={products} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ProductPage;
