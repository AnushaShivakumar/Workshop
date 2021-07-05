import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../actions/auth';
import { setAlert } from '../actions/alert';
import { done_redirect } from '../actions/redirect';
import {useHistory, Link} from 'react-router-dom';


const Register = () => {
    const dispatch = useDispatch()
    const history = useHistory(); 
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
      })
      const handleInputs = (e) =>{
        setUser({...user, [e.target.name]:e.target.value})
      }
      const onSubmit = (e) => {
          e.preventDefault()
          const {name, phone, email, password, cpassword} = user
          if(name=="" || phone=="" || email=="" || password=="" || cpassword==""){
            dispatch(setAlert("All fields are required", 'danger'))
          }
          else if(password!=cpassword){
              dispatch(setAlert("Password doesn't match", 'danger'))
          }
          else{
            dispatch(signup(name, phone, email, password, cpassword))
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
          <h1 className="logintitle">Register</h1>
      </div>
      <form>
        <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" name="name" value={user.name} onChange={handleInputs} />
          </div>
          <div class="mb-3">
              <label class="form-label">Phone</label>
              <input type="number" class="form-control" name="phone" value={user.phone} onChange={handleInputs} />
          </div>
          <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" name="email" value={user.email} aria-describedby="emailHelp" onChange={handleInputs} />
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" name="password" value={user.password} onChange={handleInputs} />
          </div>
          <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <input type="password" class="form-control" name="cpassword" value={user.cpassword} onChange={handleInputs} />
          </div>
         
          <button type="submit" class="btn btn-primary" onClick={onSubmit}>Submit</button>
          </form>
      </div>
      </div>
  )
}

export default Register