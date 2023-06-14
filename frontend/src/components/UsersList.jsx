import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function UsersList() {

    const [usersList, setUsersList] = useState([])
    const tok = window.localStorage.getItem("userToken")
    const {subgreddiitname} = useParams();
    const navigate = useNavigate()
    // console.log("hola"+subgreddiitname)
    useEffect(() => {
        axios.post("http://localhost:9002/showusersofsubgreddiit",{token: tok, greddiitname: subgreddiitname})
        .then((res) => {
            // console.log(res.data.message)
            setUsersList(res.data.message)
            // console.log(usersList)
            
        }).catch((err) => {
            console.log(err)
        })
    })

    const goBack = () => {
        navigate("/submodule/"+subgreddiitname)
    }

    return <>
        {
            usersList.map((val,index)=>{
                return (
                    <div className="card" style={{width:"18rem"}}>
                        <div className="card-body">
                          <h5 className="card-title" style={{color : "black"}} type="submit">{val}</h5>
                              {/* <p className="card-text" style={{color : "black"}}>Name: {val.name}</p> */}
                              {/* <p className="card-text" style={{color : "black"}}>Description: {val.description}</p>
                              <p className="card-text" style={{color : "black"}}>No. of followers: {val.followers.length}</p>
                              <p className="card-text" style={{color : "black"}}>List of Banned Keywords: {val.bannedKeywords}</p>
                              <p className="card-text" style={{color : "black"}}>No. of Posts: {val.post.length}</p> */}
                              {/* <button name={val.name} onClick={deleteSubGreddiit}>Delete</button> */}
                        </div>
                    </div>
                )
            })
          }
          <button onClick={goBack}>Go Back</button>
    </>


}

export default UsersList