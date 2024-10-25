import { FETCH_ADDRESSES_SUCCESS, FETCH_ADDRESSES_ERROR, CREATE_ADDRESS_SUCCESS, CREATE_ADDRESS_ERROR } from './constants';

// const initialState = {
//     Address: {
//         data: [],
//         loading: false,
//         error: null,
//     },
//     addresses: [],
//     error: null
// };

const initialState = localStorage.getItem('Auth') ? JSON.parse(localStorage.getItem('Auth')) : {
    deliveryAddress: {data:[]},
    addresses: [],
    error: null
};


export default function addressReducer(state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_ADDRESSES_SUCCESS:
            return { 
                ...state, deliveryAddress: payload.deliveryAddress, token: payload.token || state.token};
        case FETCH_ADDRESSES_ERROR:
            return { ...state, error: payload };
        case CREATE_ADDRESS_SUCCESS:
            return { ...state, addresses: [...state.addresses, payload], error: null };
        case CREATE_ADDRESS_ERROR:
            return { ...state, error: payload };
        default:
            return state;
    }
}
