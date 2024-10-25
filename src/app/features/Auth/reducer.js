import {USER_LOGIN, USER_LOGOUT, SET_PROFILE} from './constants';

const initialState = localStorage.getItem('Auth') ? JSON.parse(localStorage.getItem('Auth')) : {user: null, token: null, isLoggedIn: false};

export default function AuthReducer(state= initialState, {type, payload}){
    switch(type){
        case USER_LOGIN:
            return {...state, user: payload.user, token: payload.token, isLoggedIn: true};
        case USER_LOGOUT:
            return {user: null, token: null, profile:null, isLoggedIn: false};
        case SET_PROFILE:
            return {...state, profile: payload}
        default:
            return state;
    }
};