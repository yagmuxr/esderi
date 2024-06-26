import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./CategoryCard.css";

const CategoryCard = ({ category, image, label }) => {
  return (
    <div className="category-card">
      <Link to={`/category/${category}`}>
        <img src={image} alt={label} />
        <p>{label}</p>
      </Link>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CategoryCard;
