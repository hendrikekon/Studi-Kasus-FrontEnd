import axios from 'axios';
import config from '../../config';

export const saveCart = async (token, cart) => {
    return await axios.put(`${config.apiBaseUrl}/api/carts`, {items: cart}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};