import {USER_LOGIN, USER_LOGOUT, SET_PROFILE} from './constants';
import { loginUser, logoutUser, getProfile } from '../../api/auth';

export const userLogin = (payload) => ({
    type: USER_LOGIN,
    payload,
})

export const userLogout = () => ({
    type: USER_LOGOUT
})

export const setProfile = (payload) => ({
    type: SET_PROFILE,
    payload,
})

export const performLogin = (credentials) => async (dispatch) =>{
    
        try {
            const response = await loginUser(credentials);
            const { user, token } = response.data;
            localStorage.setItem('auth', JSON.stringify({ user, token }));
            dispatch(userLogin({ user, token }));
        } catch (error) {
            // console.error('Login error:', error);
            throw error.response ? error.response.data : error;; // Re-throw for error handling in component
        }
    
};

export const performLogout = () => {
    return async (dispatch) => {
        try {
            await logoutUser();
            dispatch(userLogout());
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
};

export const fetchProfile = () => {
    return async ( dispatch ) =>{
        try {
            const response = await getProfile();
            dispatch(setProfile(response.data))
        } catch (error) {
            console.error('Fetch profile error', error);
        }
    }
}