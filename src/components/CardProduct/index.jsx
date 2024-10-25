import React from 'react';
import config from '../../config';
import { useDispatch } from 'react-redux';
import { addItem } from '../../app/features/Carts/actions';
import './index.css';
import { useNavigate } from 'react-router-dom';
import imgCart from '../../assets/img/buy.png';

const CardProduct = ({ product, isLoggedIn }) => {
    const navigate = useNavigate()
    const imageUrl = `${config.apiBaseUrl}/images/products/${product.image_url}`;
    // const noimage = `https://th.bing.com/th/id/OIP.H1gHhKVbteqm1U5SrwpPgwAAAA?w=224&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7`;
    // console.log('Image URL:', imageUrl);
    const dispatch = useDispatch();
    const HandleAddToCart = () => {
        if(!isLoggedIn) {
            navigate('/login');
        }else{
            dispatch(addItem(product));
        }
        
    };
    return (
        <div className="card-product">
            <img src={imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Rp. {product.price}</p>
                <button className="add-to-cart" onClick={HandleAddToCart}><img src={imgCart} alt='imgcart' className='img-cart'></img></button>
            </div>
        </div>
    );
};

export default CardProduct;
