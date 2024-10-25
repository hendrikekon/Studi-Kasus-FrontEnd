import axios from 'axios';
import config from '../../config';

export const getAddress = async() =>  {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${config.apiBaseUrl}/api/delivery-address`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

export const createAddress = async data => {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.apiBaseUrl}/api/delivery-address`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}