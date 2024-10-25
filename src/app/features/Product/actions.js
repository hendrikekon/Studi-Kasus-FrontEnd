import {getProduct} from '../../api/product'
import {ERROR_FETCHING_PRODUCT, SET_CATEGORY, SET_KEYWORD, SET_PAGE, START_FETCHING_PRODUCT, SUCCESS_FETCHING_PRODUCT, TOGGLE_TAGS, NEXT_PAGE, PREV_PAGE} from './constants'
import debounce from 'debounce-promise';

const debouncedFetchProduct = debounce(getProduct, 1000);

export const startFetchingProduct = () => ({
    type: START_FETCHING_PRODUCT,
})

export const successFetchingProduct = (products) => ({
    type: SUCCESS_FETCHING_PRODUCT,
    payload: products,
})

export const errorFetchingProduct = (error) => ({
    type: ERROR_FETCHING_PRODUCT,
    payload: error.message,
})

// let debouncedFetchProduct = debounce(getProduct, 1000);

export const fetchProduct = (selectedCategory) => {
    return async (dispatch, getState) => {
        dispatch(startFetchingProduct())
        // dispatch(startFetchingProduct());
        // let perPage = getState().products.perPage || 8;
        // let currentPage = getState().products.currentPage || 1;
        // let category = getState().products.category || '';
        // let tags = getState().products.tags || [];
        // let keyword = getState().products.keyword || '';
        let { perPage, currentPage, category, tags, keyword } = getState().product;

        category = selectedCategory || category;
        const params = {
            limit: perPage,
            skip: (currentPage - 1) * perPage,
            category: category || '',
            // tags: tags.join(','),
            tags,
            q: keyword,
        }
        try {
            // console.log('Fetching products with params:', params);
            const response = await debouncedFetchProduct(params);
            if (response.data && response.count !== undefined) {
                // console.log('Fetched products:', response);
                dispatch(successFetchingProduct({ data: response.data, count: response.count }));
            } else {
                throw new Error('Invalid response structure');
            }
            // console.log('Fetched products:', response.data);
            // dispatch(successFetchingProduct(response.data));
        } catch (error) {
            console.error('Error fetching products:', error);
            dispatch(errorFetchingProduct(error));
        }
    }
}

// export const setCategory = (category) => ({
//     type: SET_CATEGORY,
//     payload: category,
// });

export const setCategory = (category) => {
    return (dispatch) => {
        dispatch({ type: SET_CATEGORY, payload: category });
        dispatch(fetchProduct(category)); // Fetch products with the new category
    };
};


export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    payload: keyword,
});

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: page,
});

export const toggleTags = (tag) => ({
    type: TOGGLE_TAGS,
    payload: tag,
});

// export const nextPage = () => ({
//     type: NEXT_PAGE,
// });
export const nextPage = () => {
    return (dispatch, getState) => {
        dispatch({ type: NEXT_PAGE });
        const { category } = getState().product; // Get the category from the current state
        dispatch(fetchProduct(category)); // Pass the current category when fetching products for the next page
    };
};

// export const prevPage = () => ({
//     type: PREV_PAGE,
// });
export const prevPage = () => {
    return (dispatch, getState) => {
        dispatch({ type: PREV_PAGE });
        const { category } = getState().product; // Get the category from the current state
        dispatch(fetchProduct(category)); // Pass the current category when fetching products for the previous page
    };
};