import axios from 'axios';
import config from '../../config';

export const createOrder = async payload => {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.apiBaseUrl}/api/orders`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function getInvoiceByOrder(order_id) {
    const {token} = localStorage.getItem('auth')
     ? JSON.parse(localStorage.getItem('auth')) : {};
     
    return await axios.get(`${config.apiBaseUrl}/api/invoices/${order_id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export async function getOrders() {
    const {token} = localStorage.getItem('auth')
     ? JSON.parse(localStorage.getItem('auth')) : {};
     
    return await axios.get(`${config.apiBaseUrl}/api/orders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}