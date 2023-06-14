import React , {useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Following(){
    const tok = window.localStorage.getItem("userToken");
    const [followingList,setFollowingList] = useState([]);
    useEffect(()=>{
        axios.post("http://localhost:9002/followinglist",{token : tok})
        .then((res)=>{
            setFollowingList(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    })

    return (
        <div>
            <Navbar />
            {followingList.map((value,index)=>{
                // console.log("value is: "+value)
                return (
                    <div>
                        <a type="submit" href={"/anotherprofiledata/" + value}>{value}</a>
                    </div>
                )
            })}
        </div>
    );
}

export default Following