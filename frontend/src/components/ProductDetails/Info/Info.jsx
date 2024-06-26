// Info.jsx
import React from "react";
import PropTypes from "prop-types";
import "./Info.css";

const Info = ({ product, addToCart }) => {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="product-info">
            <h1 className="product-title">
                {product.name}
            </h1>
            <div className="product-review">
                <ul className="product-star">
                    {[...Array(5)].map((star, index) => (
                        <li key={index}>
                            <i className={`bi bi-star${index < Math.floor(product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length) ? '-fill' : ''}`}></i>
                        </li>
                    ))}
                </ul>
                <span>{product.reviews.length} reviews</span>
            </div>
            <div className="product-price">
                {/* {product.price.discount && <s className="old-price">${product.price.current}</s>} */}
                <strong className="new-price">${product.price.current}</strong>
            </div>
            <form className="variations-form">
                <div className="variations">
                    <div className="colors">
                        <div className="colors-label">
                            <span>Color</span>
                        </div>
                        <div className="colors-wrapper">
                            {product.colors.map((color, index) => (
                                <div key={index} className="color-wrapper">
                                    <label style={{ backgroundColor: color }}>
                                        <input type="radio" name="product-color" />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="cart-button">
                        <input type="number" defaultValue="1" min="1" id="quantity" />
                        <button className="btn btn-lg btn-primary" id="add-to-cart" type="button" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                    <div className="product-extra-buttons">
                        <a href="#">
                            <i className="bi bi-heart"></i>
                            <span> Add to Wishlist</span>
                        </a>
                        <a href="#">
                            <i className="bi bi-share"></i>
                            <span> Share this Product</span>
                        </a>
                    </div>
                </div>
            </form>
            <div className="divider"></div>
            <div className="product-meta">
                <div className="product-categories">
                    <span>Categories:</span>
                    <strong>{product.category}</strong>
                </div>
                <div className="product-tags">
                    <span>Tags:</span>
                    {product.tags && product.tags.map((tag, index) => (
                        <a key={index} href="#">{tag}</a>
                    )).reduce((prev, curr) => [prev, ', ', curr])}
                </div>
            </div>
        </div>
    );
};

Info.propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
};

export default Info;
