import React, {useState, useEffect} from 'react';
import {useLocation, NavLink} from 'react-router-dom'
import Card from './Card';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import {setAlert} from '../actions/alert';


const Home = () => {
  const location = useLocation();
  const [workshops, setWorkshops] = useState({})
  const [loading, setLoading] = useState(true)
  const auth = useSelector((state) => state.auth)
  const fetchWorkshop = async () => {
    if(location.pathname==='/workshop/registered'){
      await setWorkshops(auth.user.registeredWorkshop)
      setLoading(false)
    }
    else if(location.pathname==='/workshop/created'){
      if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access'),
                'Accept': 'application/json'
            }
        };
      try {
        const res = await axios.get(`/api/workshop/user`, config);
        setWorkshops(res.data);
        setLoading(false)
    }
    catch (err) {
      console.log(err)
    }
  }
  else{
    setAlert('Login to continue', 'success')
  }
    }
    else{
      const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
      try {
          const res = await axios.get(`/api/workshop`, config);
          setWorkshops(res.data);
          setLoading(false)
      }
      catch (err) {
        console.log(err)
      }
}
  }
  useEffect(()=>{
    fetchWorkshop()
  }, [location.pathname])
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
  return(
    <>
      <div className="container homecontainer">
      {location.pathname==='/workshop/created'?
      <div className="d-flex justify-content-end addButton">
        <NavLink to="/workshop/add"><button className="btn btn-primary" style={{maxWidth:"200px"}}>Add Workshop</button></NavLink> 
      </div>
      :null
      }
      
        <div className="row">
        {workshops.map((workshop)=>{
          return(
            <div className="col col-md-4 col-sm-6 col-12">
              <Card key={workshop._id} id={workshop._id} title={workshop.title} date={workshop.date} image={workshop.image} />
          </div>
          )
        })
        }
         
          
        </div>
      </div>
    </>
  )
}
}

export default Home