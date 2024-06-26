import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ProductItem.css";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (productItem) {
      console.log("ProductItem rendered:", productItem);
    }
  }, [productItem]);

  if (!productItem) {
    return null;
  }

  const filteredCart = cartItems.find(
    (product) => product._id === productItem._id
  );

  const { img = [], name = '', price = {}, discount = '' } = productItem;
  const newPrice = price.discount || 0;
  const oldPrice = price.current || 0;

  const discountPercentage = oldPrice ? ((oldPrice - newPrice) / oldPrice) * 100 : 0;

  const handleMouseEnter = () => {
    if (img.length > 1) {
      setCurrentImage((prevImage) => (prevImage + 1) % img.length);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(0);
  };

  return (
    <li className="product-item glide__slide glide__slide--active" id={`product-${productItem._id}`}>
      <div 
        className="product-image" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/product/${productItem._id}`}>
          <img src={img[currentImage]} alt={name} className="img1" />
        </Link>
      </div>
      <div className="product-info">
        <Link to={`/product/${productItem._id}`} className="product-title">{name}</Link>
        <ul className="product-star">
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-half"></i></li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">${oldPrice.toFixed(2)}</strong>
          {/* <span className="old-price">${oldPrice.toFixed(2)}</span> */}
        </div>
        {/* <span className="product-discount">%{discountPercentage.toFixed(1)}</span> */}
        <div className="product-links">
          <button className="add-to-cart" onClick={() => addToCart(productItem)} disabled={!!filteredCart}>
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/product/${productItem._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </li>
  );
};

ProductItem.propTypes = {
  productItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.shape({
      current: PropTypes.number,
      discount: PropTypes.number,
    }),
    discount: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
