import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Nav2 from "./Nav2";
import axios, { all } from "axios";

function SubModule()
{
    const {username} = useParams();

    const [postname, setPostname] = useState('')

    const post = (e) => {
        const value = e.target.value
        setPostname(value)
        // console.log(value)
    }
    const tok = window.localStorage.getItem("userToken")

    const [allPosts, setAllPosts] = useState([])

    useEffect(() =>{
        axios.post("http://localhost:9002/getallposts", {token: tok, greddiitname: username})
        .then((res)=>{
            // console.log(res.data.posts)
            setAllPosts(res.data.posts)
            // console.log(allPosts)
        }).catch((err)=>{
            console.log(err)
        })
})

    const addPost = () => {
        axios.post("http://localhost:9002/addpost", {token: tok, post: postname, greddiitname: username})
        .then((res) => {
            console.log(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
    }
    // console.log(username)
    return<>
    <Nav2 greddiitname={username}/>
        <div class="input-group rounded">
            <input type="search" onChange={post} value={postname} class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
            <button type="button" onClick={addPost} class="btn btn-primary">
              <i class="fas fa-search"></i>
            </button>
            </span>
          </div>
          {
            allPosts.map((val,index)=>{
                return (
                    <p class="card-text" style={{color : "black"}}>{val}</p>
                )
            })
          }
    </>
}

export default SubModule;