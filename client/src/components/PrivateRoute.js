import React, {useEffect, useState}  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useHistory } from 'react-router-dom';
import {setAlert} from '../actions/alert';
import {load_user} from '../actions/auth'
import Loader from 'react-loader-spinner';


const PrivateRoute = ({ component:Component, ...rest }) => { 
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        dispatch(load_user())
    }, []);
    const history = useHistory()
    const auth = useSelector((state) => state.auth)
    console.log(auth)
    useEffect(() => {
        setLoading(auth.loading)
    }, [auth.loading]);
    if(loading){
        return(
            <div className="loading">
                 <Loader
                type="Oval"
                color="#424242"
                height={50}
                width={50}
            />
            </div>
           
        )
    }
    else{
    return (
        <Route {...rest} render={()=>{
            if (auth.isAuthenticated===true){
                return(
                    <Component />
                )
            }
            else{
                dispatch(setAlert('Login to continue', 'success'))
                history.push('/login')
            }
        }}  />
    )
}
}

export default PrivateRoute;