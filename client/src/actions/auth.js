import axios from 'axios';
import { setAlert } from './alert';
import {LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_FAIL, SIGNUP_SUCCESS, USER_LOAD_FAIL, USER_LOAD_SUCCESS, LOGOUT} from './types'
import { redirect_to } from './redirect';


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access'),
                'Accept': 'application/json'
            }
        }; 
    try{
        const res = await axios.get(`/api/user`, config);
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: res.data
        });
        dispatch(redirect_to('/'))
    }
    catch(err){
        console.log(err.response)
        dispatch({
            type: USER_LOAD_FAIL,
        });
    }
}
else{
    dispatch({
        type: USER_LOAD_FAIL,
    });
}
}

export const signup = (name, phone, email, password, cpassword) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, phone, email, password, cpassword });

    try {
        const res = await axios.post(`/api/register`, body, config);
        dispatch(setAlert('Registration Successful, Please Login', 'success'))
        dispatch({
            type: SIGNUP_SUCCESS,
        });
        dispatch(redirect_to('/login'))
    } catch (err) {
       console.log(err.response.status)
       if (err.response.status=='422'){
           dispatch(setAlert('Email already exist', 'danger'))
       }
        dispatch({
            type: SIGNUP_FAIL,
        })
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`/api/signin`, body, config);
        dispatch(setAlert('Login Successful', 'success'))
        
        console.log(res.data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load_user())
    } catch (err) {
       console.log(err.response)
       if (err.response.status=='400'){
           dispatch(setAlert('Invalid credentials', 'danger'))
       }
        dispatch({
            type: LOGIN_FAIL,
        })
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Logged out successfully', 'success'))
};