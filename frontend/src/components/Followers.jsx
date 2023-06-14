import React , {useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Followers(){
    const tok = window.localStorage.getItem("userToken");
    const [followersList,setFollowersList] = useState([]);
    useEffect(()=>{
        axios.post("http://localhost:9002/followerslist",{token : tok})
        .then((res)=>{
            setFollowersList(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    })

    const toRemove = (e) => {
        // console.log(e.target.name)
        axios.post("http://localhost:9002/toremovefollowers", {token: tok, toRemove: e.target.name})
        .then((res) => {
            console.log("it should be done")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <Navbar />
            {followersList.map((value,index)=>{
                // console.log("value is: "+value)
                return (
                    <div>
                        <a type="submit" href={"/anotherprofiledata/" + value}>{value}</a>
                        <input class="btn btn-primary" type="reset" name={value} value="Remove" onClick={toRemove}/>
                    </div>
                )
            })}
        </div>
    );
}

export default Followers