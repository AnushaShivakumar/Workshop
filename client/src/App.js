import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import { load_user } from './actions/auth';
import { useDispatch, useSelector } from "react-redux";
import Workshop from './components/Workshop';
import WorkshopForm from './components/WorkshopForm';
import PrivateRoute from './components/PrivateRoute';
import UserTable from './components/UserTable';


const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(load_user())
  }, [])
  return(
    <Router>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/workshop' component={Home} />
        <PrivateRoute exact path='/workshop/registered' component={Home} />
        <PrivateRoute exact path='/workshop/:id/users' component={UserTable} />
        <PrivateRoute exact path='/workshop/created' component={Home} />
        <PrivateRoute exact path='/workshop/add' component={WorkshopForm} />
        <Route exact path='/workshop/:id' component={Workshop} />
        <PrivateRoute exact path='/workshop/:id/edit' component={WorkshopForm} />
      </Switch>
      </Layout>
    </Router>
    
  )
}

export default App