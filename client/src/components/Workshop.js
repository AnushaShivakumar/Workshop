import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { useParams, useHistory, NavLink } from "react-router-dom";
import { setAlert } from '../actions/alert';
import { useDispatch, useSelector } from "react-redux";


const Workshop = () => {
    const {id}  = useParams();
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const [workshop, setWorkshops] = useState()
  const [loading, setLoading] = useState(true)
  const fetchWorkshop = async () => {
    
  try {
      const res = await axios.get(`/api/workshop/${id}`);
      setWorkshops(res.data[0]);
      setLoading(false)
  }
  catch (err) {
    console.log(err)
  }
  }
  useEffect(()=>{
    fetchWorkshop()
  }, [id])

  const registerWorkshop = async () => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access'),
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({id}) 
    try {
        const res = await axios.post(`/api/workshop/${id}`,body, config);
        dispatch(setAlert('Workshop registered', 'success'))
        history.go(0)
    }
    catch (err) {
        console.log('server error')
        dispatch(setAlert('Login to register', 'success'))
        history.push('/login')
    }
}else{
    dispatch(setAlert('Login to register', 'success'))
    history.push('/login')
}
    }

    const deleteWorkshop = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('access'),
                    'Accept': 'application/json'
                }
            };
        try {
            const res = await axios.delete(`/api/workshop/${id}`, config);
            dispatch(setAlert('Workshop deleted', 'success'))
            history.push('/workshop/created')
        }
        catch (err) {
          console.log(err)
        }
    }
    else{
        dispatch(setAlert('Login to continue','success'))
        history.push('/login')
    }

        }

    const renderButton = () =>{
        if(auth.isAuthenticated && workshop.createdBy._id===auth.user._id){
            return(
                <div className="d-flex justify-content-around align-items-center" style={{width:'100%'}}>
                <div>
                <NavLink to={`/workshop/${workshop._id}/edit`} > <button className="btn btn-light">Edit</button> </NavLink>
                </div>
                <div>
                <button className="btn btn-danger" onClick={deleteWorkshop}>Delete</button>
                </div>
                <div>
                   <NavLink to={`/workshop/${workshop._id}/users`} > <button className="btn btn-dark">Registered Users</button></NavLink>
                </div>
                </div>
            )
        }
        else if(auth.isAuthenticated && workshop.registeredUser.includes(auth.user._id)){
            return(
                <button className="btn btn-dark">Registered</button>
            )
        }
        else{
            return(
                <button className="btn btn-dark" onClick={()=>registerWorkshop()}>Register Now</button>
                )
        }
    }


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
            <div className="container workshopcontainer">
            <div className="workshop-title">
                <h1>{workshop.title}</h1>
            </div>
            <br />
                <div className="workshopimg">
                    <img src={workshop.image} className="workshop-img-top" alt="..." />
                </div>
                <br />
                <div className="workshop-des">
                    <h6>Date: {workshop.date}</h6>
                    <h6>Time: {workshop.stime} - {workshop.etime}</h6>
                    <h6>Organizer: {workshop.createdBy.name}</h6>
                    <h6>{workshop.description}</h6>
                </div>
                <br />
                {renderButton()}
                
                
            </div>
        </>
    )
}
}

export default Workshop