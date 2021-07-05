import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { setAlert } from '../actions/alert';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";


const WorkshopForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('Add')
    const [change, setChange] = useState(false)
    const {id}  = useParams();
    const location = useLocation()
    const [form, setForm] = useState({
        title: "",
        date: "",
        stime: "",
        etime: "",
        description: "",
        image: ""
      })
      const fetchWorkshop = async () => {
        if(location.pathname.split('/').pop()==`edit`){
        try {
            const res = await axios.get(`/api/workshop/${id}`);
            setForm(res.data[0]);
            setTitle('Edit')
            console.log('edit')
        }
        catch (err) {
          console.log(err)
            }
            }
        }
      useEffect(()=>{
            fetchWorkshop()
      }, [id])
      const handleInputs = (e) =>{
        setForm({...form, [e.target.name]:e.target.value})
      }
      const handlePhoto = (e) => {
        setForm({...form, image: e.target.files[0]});
        setChange(true)
    }
    const postData = async(form) => {
        for (var pair of form.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': localStorage.getItem('access'),
                    'Accept': 'application/json'
                }
            };
            const body = form 
        try{
            const res = await axios.post(`/api/add`, body, config);
            dispatch(setAlert('Workshop added', 'success'))
            history.push('/workshop/created')
        }
        catch(err){
            console.log(err.response)
        }
    }
    else{
        dispatch(setAlert('Please login to continue', 'success'))
    }
    }

    const updateData = async(form) => {
        for (var pair of form.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': localStorage.getItem('access'),
                    'Accept': 'application/json'
                }
            };
            const body = form 
        try{
            const res = await axios.put(`/api/workshop/${id}`, body, config);
            dispatch(setAlert('Workshop updated', 'success'))
            history.push('/workshop/created')
        }
        catch(err){
            console.log(err.response)
        }
    }
    else{
        dispatch(setAlert('Please login to continue', 'success'))
    }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('date', form.date);
        formData.append('stime', form.stime);
        formData.append('etime', form.etime);
        formData.append('description', form.description);
        formData.append('image', form.image)
        if(title=='Add'){
            postData(formData)
        }
        else{
            updateData(formData)
        }
        
    }
    return (
        <>
         <div className="container logincontainer">
    <div className="logincard">
      <div>
          <h1 className="logintitle">{title} Workshop</h1>
      </div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div class="mb-3">
              <label class="form-label">Title</label>
              <input type="text" class="form-control" name="title" value={form.title} onChange={handleInputs} />
          </div>
          <div class="mb-3">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" name="date" value={form.date} onChange={handleInputs} />
          </div>
          <div class="mb-3">
              <label class="form-label">Start Time</label>
              <input type="time" class="form-control" name="stime" value={form.stime} onChange={handleInputs} />
          </div>
          <div class="mb-3">
              <label class="form-label">End Time</label>
              <input type="time" class="form-control" name="etime" value={form.etime} onChange={handleInputs} />
          </div>
          <div class="mb-3">
              <label class="form-label">Description</label>
              <input type="text" class="form-control" name="description" value={form.description} onChange={handleInputs} />
          </div>
          <div class="mb-3">
              <label class="form-label">Image</label>
              <input type="file" accept=".png, .jpg, .jpeg" class="form-control" name="image"  onChange={handlePhoto}/>
              <p>{change?form.image.filename:form.image}</p>
          </div>
         
          <button type="submit" class="btn btn-primary">Submit</button>
          </form>
      </div>
      </div>
        </>
    )
}

export default WorkshopForm