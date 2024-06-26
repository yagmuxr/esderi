import React, { useEffect, useState, useContext } from 'react'; 
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import { CartContext } from "../context/CartProvider";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/products/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    const errorData = await response.json();
                    message.error(`Failed to fetch product: ${errorData.error}`);
                }
            } catch (error) {
                message.error("Failed to fetch: " + error.message);
                console.error("Failed to fetch:", error);
            }
        };

        fetchProductDetails();
    }, [id, apiUrl]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <ProductDetails product={product} setProduct={setProduct} addToCart={addToCart} />
    );
};

export default ProductDetailsPage;
