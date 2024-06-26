import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Search.css';

const Search = ({ isSearchShow, setIsSearchShow }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleSearch = async () => {
        if (searchTerm.trim() === '') return;

        try {
            const response = await fetch(`${apiUrl}/api/products/search/${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Arama hatası:', error);
            setSearchResults([]);
        }
    };

    return (
        <div className={`modal-search ${isSearchShow ? 'show' : ''}`}>
            <div className="modal-wrapper">
                <h3 className="modal-title">Search for products</h3>
                <p className="modal-text">Start typing to see products you are looking for.</p>
                <form className="search-form" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                    <input 
                        type="text" 
                        placeholder="Search a product" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>
                <div className="search-results">
                    <div className="search-heading">
                        <h3>RESULTS FROM PRODUCT</h3>
                    </div>
                    <div className="results">
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <a href={`/product/${product._id}`} key={product._id} className="result-item">
                                    <img src={product.img[0]} className="search-thumb" alt={product.name} />
                                    <div className="search-info">
                                        <h4>{product.name}</h4>
                                        <span className="search-sku">SKU: {product._id}</span>
                                        <span className="search-price">${product.price.current}</span>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <p>No results found</p>
                        )}
                    </div>
                </div>
                <i className="bi bi-x-circle" id="close-search" onClick={() => setIsSearchShow(false)}></i>
            </div>
        </div>
    );
};

Search.propTypes = {
    isSearchShow: PropTypes.bool.isRequired,
    setIsSearchShow: PropTypes.func.isRequired
};

export default Search;
