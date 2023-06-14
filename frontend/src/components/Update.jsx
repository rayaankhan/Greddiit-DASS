import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

// https://bbbootstrap.com/snippets/bootstrap-edit-profile-form-84177583

function Update() {
    
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        age: '',
        email: ''
    })
    const [about, setAbout] = useState("")

    let name, value;
    const addData = (e) => {
        name = e.target.name;
        value = e.target.value
        if(name === "about")
            setAbout(value)
        setUserDetails({...userDetails,[name]: value});
    }

    const tok = window.localStorage.getItem("userToken");
    // alert(tok);
    useEffect(() => {
        axios.post("http://localhost:9002/getprevvalues",{token : tok})
        .then((res) => {
          var getdata = res.data.values;
          var profData = res.data.profileData
          setUserDetails(getdata);
          setAbout(profData.about)
        //   console.log(getdata)
          
        }).catch((err) => {
            console.log(err);
          });
  }, []);
    const navigate = useNavigate();
    const sendData = (e) => {
        // alert(userDetails)
        axios.post("http://localhost:9002/update", {finalUser: userDetails, token: tok, ab: userDetails.about})
        .then((res) => {
            // console.log(userDetails)
            // token = jwt.sign(us.toJSON(), secretkey);
            // window.localStorage.setItem("userToken",token);
            // alert(res.data.message)
            navigate("/profile")
        }).catch((err) =>{
            console.log(err);
        })
    }

    const goToProfile = () => {
        navigate("/profile")
    }
    
    return <>
    <div className="container rounded bg-white mt-5">
        <div className="row">
            <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" width="90" alt=""/><span className="font-weight-bold">@{userDetails.userName}</span><span className="text-black-50">{userDetails.email}</span></div>
            </div>
            <div className="col-md-8">
                <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                            <h6 onClick={goToProfile}>Back to home</h6>
                        </div>
                        <h6 className="text-right">Edit Profile</h6>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <input onChange={addData} name="firstName" type="text" className="form-control" placeholder="First Name" value={userDetails.firstName} />
                        </div>
                        <div className="col-md-6">
                            <input onChange={addData} name="lastName" type="text" className="form-control" value={userDetails.lastName} placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        {/* <div className="col-md-6">
                            <input onChange={addData} name="userName" type="text" className="form-control" placeholder="Username" value={userDetails.userName} />
                        </div> */}
                        <div className="col-md-6">
                            <input onChange={addData} name="age" type="number" className="form-control" value={userDetails.age} placeholder="Age" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <input onChange={addData} name="about" type="text" className="form-control" placeholder="About" value={about} />
                        </div>
                    </div>
                    <div className="mt-5 text-right"><button onClick={sendData} className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Update;