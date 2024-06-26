import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Spin } from "antd";
import ProductCard from "../components/Products/ProductItem"; 

const CategoriesPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/category/${category}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Ürünler getirilirken bir hata oluştu.");
        }
      } catch (error) {
        message.error("Ürünler getirilirken bir hata oluştu: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, apiUrl]);

  return (
    <div className="category-page">
      {loading ? (
        <Spin spinning={loading} />
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
