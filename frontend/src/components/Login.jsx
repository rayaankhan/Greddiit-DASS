import { warning } from "@remix-run/router";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function Login(props) {

    const navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem("login") != null) {
            navigate("/profile");
        }
    });

    var [loginCredentials, setLoginCredentials] = useState({
        userName: '',
        password: ''
    })

    let name, value;

    const addData = (e) => {
        // alert("1");
        name = e.target.name;
        value = e.target.value
        setLoginCredentials({...loginCredentials,[name]: value});
    }

    function navigateProfilePage(event) {
        event.preventDefault();
        // if (newUsername === "admin" && newPassword === "admin") {
        //     window.localStorage.setItem("login", "true");
        //     navigate("/profile");
        // }

        if(loginCredentials.password && loginCredentials.userName){
            axios.post("http://localhost:9002/login", loginCredentials)
            .then((res) => {
                if(res.data.message === 1)
                {
                    window.localStorage.setItem("login", true);
                    window.localStorage.setItem("userToken",res.data.tok);
                    
                    navigate("/profile");
                }
                else
                {
                    // alert("2");
                    alert("Wrong credentials.");
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
        else
            alert("Can't leave the field blank.");
        // event.preventDefault();
    }

    function Ramyaan1()
    {
        if(!loginCredentials.password || !loginCredentials.userName)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    // if(window.localStorage.getItem("login") === "true")
    //     navigate("/profile")
    // console.log(window.localStorage.getItem("login"));
    return (
        <div>
            <Navbar />
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-7 col-lg-3 col-xl-3 offset-xl-1">
                            <form>
                                <div>
                                    {/*This is how we add image in react IMP */}
                                    <img src={require("../img/greddiitlogo.png")} alt="greddiit" style={{position: "relative", top: "80px"}}/>
                                </div>
                                <div className="form-outline mb-4" style={{ paddingTop: "100px" }}>
                                    <label className="form-label" htmlFor="form1Example13">Username</label>
                                    <input value={loginCredentials.userName} onChange={addData} name="userName" id="form1Example13" className="form-control form-control-lg" placeholder="Your username" />
                                </div>

                                <div className="form-outline mb-4" style={{ paddingBottom: "20px" }}>
                                    <label className="form-label" htmlFor="form1Example23">Password</label>
                                    <input value={loginCredentials.password} type="password" onChange={addData} name="password" id="password" className="form-control form-control-lg" placeholder="********" />
                                    {/* <p id="warning">Caps Lock is on!</p> */}
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={Ramyaan1()} onClick={navigateProfilePage}>Sign in</button>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>

                                <div style={{ paddingBottom: "10px" }}>
                                    <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }} href="#!"
                                        role="button" >
                                        <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                                    </a></div>
                                <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#fff" , color: "black"}} href="#!"
                                    role="button">
                                    <i className="fab fa-brands fa-google"></i> Continue with Google</a>

                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <a href="#!" onClick={() => props.onFormSwitch("register")}
                                    style={{ color: "#393f81" }}>Register here</a></p>
                            </form>
                            {/* <script>
                                var field = document.getElementById("password");
                                var warning = document.getElementById("warning");
                                field.addEventListener("keyup", function(event){
                                    if(event.getModifierState("CapsLock")){warning.classList.add("show");}
                                    else{warning.classList.remove("show");}
                                })
                            </script> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
