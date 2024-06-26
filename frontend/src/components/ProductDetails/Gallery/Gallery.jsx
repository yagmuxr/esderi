// Gallery.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Gallery.css";

const Gallery = ({ images }) => {
    const [activeImg, setActiveImg] = useState(images[0]);

    const handleImageClick = (src) => {
        setActiveImg(src);
    };

    return (
        <div className="product-gallery">
            <div className="single-image-wrapper">
                <img src={activeImg} id="single-image" alt="" />
            </div>
            <div className="product-thumb">
                <div className="glide__track" data-glide-el="track">
                    <ol className="gallery-thumbs glide__slides">
                        {images.map((img, index) => (
                            <li
                                key={index}
                                className={`glide__slide ${activeImg === img ? "glide__slide--active" : ""}`}
                                style={{ width: '116.333px', margin: '0 5px' }}
                            >
                                <img
                                    src={img}
                                    alt=""
                                    className="img-fluid"
                                    onClick={() => handleImageClick(img)}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Gallery;
