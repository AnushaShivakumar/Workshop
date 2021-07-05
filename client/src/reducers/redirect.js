import { SET_REDIRECT, REMOVE_REDIRECT } from '../actions/types';

const initialState = {
    to: ''
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_REDIRECT:
            return {
                to: payload
            }
        case REMOVE_REDIRECT:
            return {
                to: ''
            }
        default:
            return state;
    }
}