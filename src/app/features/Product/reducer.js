import {ERROR_FETCHING_PRODUCT, SET_CATEGORY, SET_KEYWORD, SET_PAGE, START_FETCHING_PRODUCT, SUCCESS_FETCHING_PRODUCT, TOGGLE_TAGS, NEXT_PAGE, PREV_PAGE} from './constants'

const statusList = {
    idle: 'idle',
    process: 'process',
    success:'success',
    error: 'error'
};

const initialState = {
    data:[],
    currentPage: 1,
    totalItems: 0,
    perPage: 8,
    keyword: '',
    category: '',
    tags: [],
    status: statusList.idle
};

export default function productReducer(state = initialState, {type, payload}) {
    switch (type) {
        case START_FETCHING_PRODUCT:
            return {...state, status: statusList.process};
        case SUCCESS_FETCHING_PRODUCT:
            // console.log('Reducing SUCCESS_FETCHING_PRODUCT:', payload); 
            return {...state, status: statusList.success, data: payload.data, totalItems: payload.count};
        case ERROR_FETCHING_PRODUCT:
            return {...state, status: statusList.error};
        case SET_KEYWORD:
            return {...state, keyword: payload};
        case SET_CATEGORY:
            return {...state, category: payload};
        case TOGGLE_TAGS:
            return !state.tags.includes(payload)
        ? { ...state, currentPage: 1, tags: [...state.tags, payload] }
        : { ...state, currentPage: 1, tags: state.tags.filter(tag => tag !== payload) };
            // const newTags = [...state.tags];
            // if(newTags.includes(payload)) {
            //     newTags.splice(newTags.indexOf(payload), 1);
            // } else {
            //     newTags.push(payload);
            // }
            // return {...state, tags: newTags, currentPage: 1};
        case NEXT_PAGE:
            return {...state, currentPage: state.currentPage + 1};
        case PREV_PAGE:
            return {...state, currentPage: state.currentPage - 1};
        case SET_PAGE:
            return {...state, currentPage: payload.currentPage};
        default:
            return state;
    }
};