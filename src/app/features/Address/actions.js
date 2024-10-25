import { getAddress, createAddress } from '../../api/address';
import { FETCH_ADDRESSES_SUCCESS, FETCH_ADDRESSES_ERROR, CREATE_ADDRESS_SUCCESS, CREATE_ADDRESS_ERROR } from './constants';

export const fetchAddresses = () => {
    return async (dispatch) => {
        try {
            const response = await getAddress();
            //console.log('Response from API:', response);
            dispatch({ 
                type: FETCH_ADDRESSES_SUCCESS, 
                payload: { 
                    deliveryAddress: response.data.data, 
                    token: response.data.token || null
                }
                // payload: response.data 
            });
        } catch (error) {
            console.error('Fetch addresses error:', error);
            dispatch({ type: FETCH_ADDRESSES_ERROR, payload: error.message });
        }
    };
};

export const addAddress = (data) => {
    return async (dispatch) => {
        try {
            const response = await createAddress(data);
            dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: response.data });
        } catch (error) {
            console.error('Create address error:', error);
            dispatch({ type: CREATE_ADDRESS_ERROR, payload: error.message });
        }
    };
};
