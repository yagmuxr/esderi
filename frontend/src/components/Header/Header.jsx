import "./Header.css";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link, useLocation } from "react-router-dom";

const Header = ({ setIsSearchShow }) => {
    const { pathname } = useLocation();
    const { cartItems } = useContext(CartContext);
    const user = localStorage.getItem("user");

    const handleLogout = () => {
        if (window.confirm("Are you sure to log out?")) {
            localStorage.removeItem("user");
            window.location.href = "/";
        }
    };

    return (
        <header>
            <div className="global-notification">
                <div className="container">
                    <p>
                        SUMMER & MOTHER'S DAY SALE FOR ALL
                        - OFF 50%! FREE SHIPPING IN NETHERLANDS 🇳🇱
                        <Link to="/shop"> SHOP NOW!</Link>
                    </p>
                </div>
            </div>
            <div className="header-row">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="header-mobile">
                            <i className="bi bi-list" id="btn-menu"></i>
                        </div>
                        <div className="header-left">
                            <Link to="/" className="logo">EsDeri</Link>
                        </div>
                        <div className="header-center" id="sidebar">
                            <nav className="navigation">
                                <ul className="menu-list">
                                    <li className="menu-list-item">
                                        <Link to="/" className={`menu-link ${pathname === "/" ? "active" : ""}`}>
                                            Home
                                        </Link>
                                    </li>
                                    <li className="menu-list-item megamenu-wrapper">
                                        <Link to="/shop" className={`menu-link ${pathname === "/shop" ? "active" : ""}`}>
                                            Shop
                                            <i className="bi bi-chevron-down"></i>
                                        </Link>
                                        <div className="menu-dropdown-wrapper">
                                            <div className="menu-dropdown-megamenu">
                                                <div className="megamenu-links">
                                                    <div className="megamenu-products">
                                                        <h3 className="megamenu-products-title">
                                                            Categories
                                                        </h3>
                                                        <ul className="megamenu-menu-list">
                                                            <li>
                                                                <Link to="/man">Man</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/woman">Woman</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/accessories">Accessories</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="megamenu-single">
                                                    <Link to="/shop">
                                                        <img src="/img/esderi.jpg" alt="" />
                                                    </Link>
                                                    <h3 className="megamenu-single-title"></h3>
                                                    <h4 className="megamenu-single-subtitle"></h4>
                                                    <Link to="/shop" className="megamenu-single-button btn btn-sm">Shop Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="menu-list-item">
                                        <Link to="/contact" className={`menu-link ${pathname === "/contact" ? "active" : ""}`}>
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <i className="bi-x-circle" id="close-sidebar"></i>
                        </div>
                        <div className="header-right">
                            <div className="header-right-links">
                                <Link to="/auth" className="header-account">
                                    <i className="bi bi-person"></i>
                                </Link>
                                <button className="search-button" onClick={() => setIsSearchShow(true)}>
                                    <i className="bi bi-search"></i>
                                </button>
                                <Link to="/wishlist">
                                    <i className="bi bi-heart"></i>
                                </Link>
                                <div className="header-cart">
                                    <Link to="/cart" className="header-cart-link">
                                        <i className="bi bi-bag"></i>
                                        <span className="header-cart-count">{cartItems.length}</span>
                                    </Link>
                                </div>
                                {user && (
                                    <button className="logout-button" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
