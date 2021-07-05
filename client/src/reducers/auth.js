import {LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_FAIL, SIGNUP_SUCCESS, USER_LOAD_SUCCESS, USER_LOAD_FAIL, LOGOUT} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    isAuthenticated: false,
    user: null,
    loading: true,
    error: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case USER_LOAD_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }
        case USER_LOAD_FAIL:
        case SIGNUP_SUCCESS:
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false
            }
        case LOGIN_SUCCESS: 
            localStorage.setItem('access', payload.token);
            return state
        case LOGOUT:
            localStorage.removeItem('access');
            return {
                ...state,
                user: null, 
                isAuthenticated: false,
                loading: false
            }
        default:{
            return state
        }
        }
    }
