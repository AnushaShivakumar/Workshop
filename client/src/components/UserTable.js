import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { useParams, useHistory } from "react-router-dom";
import { setAlert } from '../actions/alert';
import { useDispatch, useSelector } from "react-redux";


const UserTable = () => {
    const {id}  = useParams();
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const [workshop, setWorkshops] = useState()
  const [loading, setLoading] = useState(true)
    const fetchWorkshop = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('access'),
                    'Accept': 'application/json'
                }
            };
        try {
            const res = await axios.get(`/api/workshop/${id}/detail`, config);
            await setWorkshops(res.data[0]);
            setLoading(false)
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
        useEffect(()=>{
          fetchWorkshop()
        }, [id])
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
    else if(workshop.createdBy._id==auth.user._id){
    return(
        <div className="usertable">
        <div className="table-responsive">
        <table className="table">
  <thead className="table-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
    </tr>
  </thead>
  <tbody>
    
    {workshop.registeredUser.map((user)=>{
        return(
            <>
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                </tr>
            </>
        )
    })}
    
  </tbody>
</table>
        </div>
        </div>
    )
}
else{
    dispatch(setAlert('Login to continue','success'))
    history.push('/login')
}
}

export default UserTable;