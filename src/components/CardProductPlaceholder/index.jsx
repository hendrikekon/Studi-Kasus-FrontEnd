import React from 'react';
import './index.css';

const CardProductPlaceholder = () => {
    return (
        <div className="card-product-placeholder">
            <div className="placeholder-image"></div>
            <div className="placeholder-details">
                <div className="placeholder-name"></div>
                <div className="placeholder-price"></div>
                <div className="placeholder-button"></div>
            </div>
        </div>
    );
};

export default CardProductPlaceholder;
