import React from 'react';
import {NavLink} from 'react-router-dom'

const Card = (props) => {
    return(
        <>
        <div className="card">
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">Date: {props.date}</p>
            <NavLink to={`/workshop/${props.id}`} className="btn btn-primary">Get Details</NavLink>
        </div>
        </div>
        </>
    )
}

export default Card;