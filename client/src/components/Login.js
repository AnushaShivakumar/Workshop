import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/auth';
import { setAlert } from '../actions/alert';
import { done_redirect } from '../actions/redirect';
import {useHistory, Link} from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory(); 
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    if(email=="" || password==""){
      dispatch(setAlert("Both fields are required", 'danger'))
    }
    else{
      dispatch(login(email, password))
    }
    
}
    const redirect = useSelector((state) => state.redirect);
    if(redirect.to){
        const link = redirect.to
        dispatch(done_redirect())
        history.push(link)
    }
  return(
      <div className="container logincontainer">
      <div className="logincard">
        <div>
            <h1 className="logintitle">LOGIN</h1>
        </div>
        <form>
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-primary" onClick={onSubmit}>Submit</button>
            </form>
        </div>
        </div>
  )
}

export default Login