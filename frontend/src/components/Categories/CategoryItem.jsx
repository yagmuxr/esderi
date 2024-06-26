import React from 'react';
import PropTypes from 'prop-types';
import './CategoryItem.css';

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      <a href="#">
        <img src={category.img} alt={category.name} className="category-image" />
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryItem;
