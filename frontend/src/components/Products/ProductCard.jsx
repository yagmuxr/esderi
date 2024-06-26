import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesProvider";

const ProductCard = ({ product }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const isFavorite = favorites.some((item) => item._id === product._id);

  const handleFavoriteClick = async () => {
    if (!user) {
      return alert("Please log in to add favorites.");
    }
    
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const body = { userId: user._id, productId: product._id };
    
    try {
      const response = await fetch(
        `${apiUrl}/api/favorites/${isFavorite ? "remove" : "add"}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        isFavorite ? removeFromFavorites(product._id) : addToFavorites(product);
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update favorites.");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.img[0]} alt={product.name} />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>${product.price.current}</p>
        </div>
      </Link>
      <button
        className={`favorite-button ${isFavorite ? "favorited" : ""}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
