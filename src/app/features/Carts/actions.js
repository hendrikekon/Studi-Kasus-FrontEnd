import {ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM} from './constants';
// import { saveCart } from '../../api/cart';

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: {
        item: {
            ...item,
            product: item.product || item,
            qty: item.qty ? item.qty + 1 : 1,
        }
    }
});

export function removeItem(item){
    return{
        type: REMOVE_ITEM,
        payload: {
            item: item
        }
    }
    
};

export function clearItem(){
    return{
        type: CLEAR_ITEM
    }
}

// export const addItem = (item) => (dispatch, getState) => {
//     const cartItems = getState().cart; // Get the current cart state

//     const existingItem = cartItems.find(cartItem => cartItem._id === item._id);

//     if (existingItem) {
//         // If the item exists, just update the quantity
//         dispatch({
//             type: ADD_ITEM,
//             payload: {
//                 item: {
//                     ...existingItem,
//                     qty: item.qty ? item.qty + 1 : 1 // Set to new quantity
//                 }
//             }
//         });
//     } else {
//         // If the item does not exist, add it to the cart
//         dispatch({
//             type: ADD_ITEM,
//             payload: {
//                 item: {
//                     ...item,
//                     qty: 1 // Set initial quantity to 1
//                 }
//             }
//         });
//     }
// };
