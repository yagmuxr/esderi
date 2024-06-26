import React, { useContext, useState, useEffect, useCallback } from "react";
import "./Product.css";
import ProductItem from "./ProductItem";
import { CartContext } from "../../context/CartProvider";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        const errorData = await response.json();
        console.error(`Failed to fetch products: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Modern Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track" data-glide-el="track">
            <ul className="product-list glide__slides" id="product-list">
              {products.map((product) => (
                <ProductItem key={product._id} productItem={product} addToCart={addToCart} />
              ))}
            </ul>
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button className="glide__arrow glide__arrow--left">
              <i className="bi bi-chevron-left"></i>
            </button>
            <button className="glide__arrow glide__arrow--right">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
