import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function MySubGreddiit(){

    const navigate = useNavigate()
    const createSubgreddiit = () => {
        // console.log("hi")
        navigate("/subgreddiitform")
    }

    const goBack = () => {
        navigate("/profile")
    }
    var [subGreddiitData, setSubGreddiitData] = useState([]);
    const tok = window.localStorage.getItem("userToken");
    useEffect(() => {
    axios.post("http://localhost:9002/getsubgreddiitdata", {token: tok})
    .then((res) => {
        var gredditdata = res.data.message
        setSubGreddiitData(gredditdata)
        // console.log(subGreddiitData)
      })
      .catch((err) => {
        console.log(err);
      })
    })

    const deleteSubGreddiit = (e) => {
        const toDelete = e.target.name
        axios.post("http://localhost:9002/deletesubgreddiit", {token: tok, todelete: toDelete})
        .then((res) => {
            console.log("Deleted")
          })
          .catch((err) => {
            console.log(err);
          })
    }

    return <>
    <Navbar />
        {/* <div class="input-group rounded">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
        </div> */}

        <div className="d-flex pt-3">
            <button type="button" className="btn btn-primary" onClick={createSubgreddiit} style={{zIndex: "1", display: "inline-block"}}>Create Subgreddiit</button>
          </div>
          {
            subGreddiitData.map((val,index)=>{
                return (
                    <div class="card" style={{width:"18rem"}}>
                        <div class="card-body">
                          <h5 class="card-title" style={{color : "black"}} onClick={()=>{navigate("/submodule/"+val.name)}} type="submit">{val.name}</h5>
                              {/* <p class="card-text" style={{color : "black"}}>Name: {val.name}</p> */}
                              <p class="card-text" style={{color : "black"}}>Description: {val.description}</p>
                              <p class="card-text" style={{color : "black"}}>No. of followers: {val.followers.length}</p>
                              <p class="card-text" style={{color : "black"}}>List of Banned Keywords: {val.bannedKeywords}</p>
                              <p class="card-text" style={{color : "black"}}>No. of Posts: {val.post.length}</p>
                              <button name={val.name} onClick={deleteSubGreddiit}>Delete</button>
                        </div>
                    </div>
                )
            })
          }
          <button onClick={goBack}>Go Back</button>
    </>
}

export default MySubGreddiit