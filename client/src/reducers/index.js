import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import redirect from './redirect';


export default combineReducers({
    auth,
    alert,
    redirect
});