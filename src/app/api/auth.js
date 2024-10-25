import axios from 'axios';
import config from '../../config';

export const registerUser = async (data) => {
    return await axios.post(`${config.apiBaseUrl}/auth/register`, data);
};

export const loginUser = async (data) => {
    try {
        return await axios.post(`${config.apiBaseUrl}/auth/login`, data);
        // const response = await axios.post(`${config.apiBaseUrl}/auth/login`, data);
        // return response
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Login failed');
        }
        throw error;
    }
};

export const logoutUser = async () => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;
    if (!token) {
        throw new Error('No token found');
    }
    return await axios.post(`${config.apiBaseUrl}/auth/logout`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        localStorage.removeItem('auth');
        return res;
    })
};

export const getProfile = async () => {
    const token = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')).token : null;
    if (!token) {
        throw new Error('No token found');
    }
    return await axios.get(`${config.apiBaseUrl}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};