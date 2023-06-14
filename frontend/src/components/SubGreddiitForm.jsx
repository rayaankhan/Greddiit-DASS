import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";


function SubGreddiitForm(){

    const tok = window.localStorage.getItem("userToken");

    const [newSubGreddit, setNewSubGreddiit] = useState({
        userName : '',
        name : '',
        followers : [],
        post : [],
        postuser : [],
        description : '',
        date : Date,
        tags : [],
        bannedKeywords : []
    })
    
    const [tag,settag] = useState("");
    const [banned,setbanned] = useState("");
    
    function AddData(e){
        const name = e.target.name
        const value = e.target.value
        // console.log(name, value)
        setNewSubGreddiit({...newSubGreddit,[name]: value});
        console.log(newSubGreddit)
    }

    const navigate = useNavigate()
    // axios.post("http://localhost:9002/getsubgreddiitdata", {sub: newSubGreddit, token: tok})
    const sendData = (e) => {
        let value2 = tag.split(" ");
        // console.log(value2)
        for(var i = 0; i < value2.length;i++)
        {
            value2[i] = value2[i].trim();
            // console.log(value2[i])
            newSubGreddit.tags.push(value2[i]);
            console.log(newSubGreddit.tags)
            
        }

        value2 = banned.split(" ");
        for(i = 0; i < value2.length;i++)
        {
            value2[i] = value2[i].trim();
            console.log(value2[i])
            newSubGreddit.bannedKeywords.push(value2[i]);
        }
        // console.log(newSubGreddit)

        axios.post("http://localhost:9002/addsubgreddiit", {sub: newSubGreddit, token: tok})
        .then((res) => {
            if(res.message === 1)
            {
                // navigate("/mysubgreddiits")
            }
            // console.log(res)
        })
    }

    const goBack = () => {
        navigate("/mysubgreddiits")
    }


    // let name,value; 
    // const handleSubmit = (e)=>{
    //     name = e.target.name;
    //     value = e.target.value;
    //     setnewsubgredditdata({...newsubgredditdata,[name]:value});
    // }

    // const handleSubmit2 = ()=>{
    //     let value2 = tag.split(" ");
    //     for(var i = 0; i < value2.length;i++)
    //     {
    //         value2[i] = value2[i].trim();
    //         newsubgredditdata.tags.push(value2[i]);
    //     }
    // }

    // const handleSubmit3 = ()=>{
    //     let value2 = banned.split(" ");
    //     for(var i = 0; i < value2.length;i++)
    //     {
    //         value2[i] = value2[i].trim();
    //         newsubgredditdata.bannedKeywords.push(value2[i]);
    //         console.log(value2[i]);
    //     }
    // }


    return <>
    <Navbar />
    <div className="col-md-7 col-lg-3 col-xl-3 offset-xl-1">
        <form>
      <div class="form-group">
        {/* <label for="exampleFormControlInput1">Name</label> */}
        <input name="name" value={newSubGreddit.name} onChange={AddData} class="form-control" id="exampleFormControlInput1" placeholder="Name" />
      </div>
      <div class="form-group">
        {/* <label for="exampleFormControlInput1">Email address</label> */}
        <input name="description" value={newSubGreddit.description} onChange={AddData} class="form-control" id="exampleFormControlInput1" placeholder="Description" />
      </div>
      <div class="form-group">
        {/* <label for="exampleFormControlInput1">Email address</label> */}
        <input name="tags" value={tag} onChange={(e)=>{settag(e.target.value)}} class="form-control" id="exampleFormControlInput1" placeholder="Tags" />
      </div>
      <div class="form-group">
        {/* <label for="exampleFormControlInput1">Email address</label> */}
        <input name="bannedKeywords" value={banned} onChange={(e)=>{setbanned(e.target.value)}} class="form-control" id="exampleFormControlInput1" placeholder="Banned Keywords" />
      </div>
      <button onClick={sendData} name="submit" className="btn btn-primary btn-lg btn-block">Create</button>
      <button onClick={goBack}>Go Back</button>
      
      
      
    </form>
      </div>
    </>
}

export default SubGreddiitForm