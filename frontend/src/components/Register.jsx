import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Register(props) {
    console.log(props)
    const navigate = useNavigate();
    var [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        age: '',
        contact: '',
        password: '',
        reEnterPassword: ''
    })
    let name, value;

    const addData = (e) => {
        // console.log(e.target.value);
        name = e.target.name;
        value = e.target.value
        // [name, value] = useState(e.target);
        // setCredentials({...credentials, [name]: value});
        setCredentials({...credentials,[name]: value});
        // console.log(name);
        // console.log(credentials);
    }
    function Ramyaan()
    {
        if(!credentials.firstName || !credentials.lastName || !credentials.userName || !credentials.email || !credentials.age || !credentials.contact || !credentials.password)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    const registerNow = (e)=>
        ((credentials.firstName && credentials.lastName && credentials.userName && credentials.email && credentials.age && credentials.contact && credentials.password && credentials.reEnterPassword) && (credentials.password === credentials.reEnterPassword))?
            (axios.post("http://localhost:9002/register", credentials)
            .then((res) => {
                // alert(res.data.message);
                if(res.data.message === 1)
                {
                    // alert("2");
                    console.log("Now we are navigating");
                }else if(res.data.message === 0){
                    alert("fault");
                    console.log("Now we are navigating0");
                }
                else if(res.data.message === 2)
                {
                    alert("register");
                    console.log("Now we are navigating2");
                    // window.location.reload();
                    // props.setCurrentForm("login")
                    // navigate("/");
                }
            }).catch((err)=>{
                console.log(err);
            }))
        
        :alert("nahh");

    return (
        <div>
        <Navbar />
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-7 col-lg-3 col-xl-3 offset-xl-1">
                            <form method="POST">
                                <div className="form-outline mb-4" style={{ paddingTop: "100px" }}>
                                    <label className="form-label">First Name</label>
                                    <input value={credentials.firstName} onChange={addData} name="firstName" className="form-control form-control-lg" placeholder="First Name" />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Last Name</label>
                                    <input value={credentials.lastName} onChange={addData} name="lastName" className="form-control form-control-lg" placeholder="Last Name" />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Username</label>
                                    <input value={credentials.userName} onChange={addData} name="userName" className="form-control form-control-lg" placeholder="Username" />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Email</label>
                                    <input value={credentials.email} onChange={addData} name="email" className="form-control form-control-lg" placeholder="Email" type="email"/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Age</label>
                                    <input value={credentials.age} onChange={addData} name="age" className="form-control form-control-lg" placeholder="Age" type="number"/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Contact</label>
                                    <input value={credentials.contact} onChange={addData} name="contact" className="form-control form-control-lg" placeholder="Contact" max="9999999999" min="1000000000"/>
                                </div>

                                <div className="form-outline mb-4" style={{ paddingBottom: "10px" }}>
                                    <label className="form-label">Password</label>
                                    <input value={credentials.password} onChange={addData} name="password" className="form-control form-control-lg" placeholder="********" type="password"/>
                                </div>

                                <div className="form-outline mb-4" style={{ paddingBottom: "10px" }}>
                                    <label className="form-label">Re-Enter Password</label>
                                    <input value={credentials.reEnterPassword} onChange={addData} name="reEnterPassword" className="form-control form-control-lg" placeholder="********" type="password"/>
                                </div>

                                <button name="submit" className="btn btn-primary btn-lg btn-block" disabled={Ramyaan()} onClick={registerNow}>Sign Up</button>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>

                                <div style={{ paddingBottom: "10px" }}>
                                    <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }} href="#!"
                                        role="button" >
                                        <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                                    </a></div>
                                <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#55acee" }} href="#!"
                                    role="button">
                                    <i className="fab fa-twitter me-2"></i>Continue with Google</a>

                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Already have an account? <a  onClick={() => props.onFormSwitch("login")} href="#!"
                                    style={{ color: "#393f81" }}>Login here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register;