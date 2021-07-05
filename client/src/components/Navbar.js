import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/auth';

const Navbar = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const logout_user = () => {
        dispatch(logout());
    };
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">Event</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
          </li>
          {!auth.isAuthenticated?
          <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/signup">Register</NavLink>
            </li>
            </>
            :
            <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/workshop/registered">Registered Workshop</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/workshop/created">My Workshop</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to='/' onClick={logout_user}>Logout</NavLink>
            </li>
            </>
          }
          
          </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar