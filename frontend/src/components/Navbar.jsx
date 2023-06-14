import React from "react";
import { useNavigate } from "react-router-dom";
import RedditIcon from '@mui/icons-material/Reddit';
import LinkIcon from '@mui/icons-material/Link';
// import * as nav from "mdb-ui-kit"

function Navbar(props) {
    const navigate = useNavigate();
    function toLogOut() {
        window.localStorage.removeItem("login");
        navigate("/");
    }

    function toSubGreddiit() {
        console.log("hereweare")
    }
    // const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info" style={{height: "50px"}}>
            {/* <a class="navbar-brand" href="#" style={{paddingLeft: "20px"}}>Grediit</a> */}
            <RedditIcon className="mui-reddit" style={{transform: "scale(5.5)", paddingLeft: "15px"}}/>
            <div className="d-flex pt-1" style={{ paddingLeft: "1700px"}}>
                <LinkIcon onClick={toSubGreddiit} fontSize="large" className="mui-link"/>
                <button type="button" className="btn btn-primary flex-grow-1" onClick={toLogOut} style={{zIndex: "1", display: "inline-block"}}>Log Out</button>
              </div>
            {/* <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a onClick={() => props.onFormSwitch("login")} class="nav-item nav-link active" href="#">Login <span class="sr-only">(current)</span></a>
                    <a onClick={() => props.onFormSwitch("register")} class="nav-item nav-link" href="#">Sign Up</a>
                </div>
            </div> */}
        </nav>
    )
}

export default Navbar;