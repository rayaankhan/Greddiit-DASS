import React , { useState }from "react";
import { useNavigate } from "react-router-dom";
import RedditIcon from '@mui/icons-material/Reddit';
import LinkIcon from '@mui/icons-material/Link';
import axios from "axios";
// import * as nav from "mdb-ui-kit"

function Navbar(props) {
    const navigate = useNavigate();
    function toLogOut() {
        window.localStorage.removeItem("login");
        navigate("/");
    }

    const tok = window.localStorage.getItem("userToken");

    function toMySubGreddiits() {
        // console.log("hereweare")
        navigate("/mysubgreddiits")
    }

    const [usersList, setUsersList] = useState([])

    function showAllUsers() {
        const greddiitname = props.greddiitname
        // console.log(greddiitname)
        // axios.post("http://localhost:9002/showusersofsubgreddiit",{token: tok, greddiitname: props.greddiitname})
        // .then((res) => {
        //     // console.log(res.data.message)
        //     setUsersList(res.data.message)
        //     console.log(usersList)
            
        // }).catch((err) => {
        //     console.log(err)
        // })
        navigate("/submodule/"+greddiitname+"/users")
    }
    // const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info" style={{height: "70px"}}>
            {/* <a class="navbar-brand" href="#" style={{paddingLeft: "20px"}}>Grediit</a> */}
            <RedditIcon className="mui-reddit" style={{transform: "scale(5.5)", paddingLeft: "15px"}}/>
            <div className="d-flex pt-1" style={{ paddingLeft: "1500px"}}>
                {/* <LinkIcon onClick={toSubGreddiit} fontSize="large" className="mui-link"/> */}
                <button type="button" className="btn btn-primary flex-grow-1" onClick={toMySubGreddiits} style={{zIndex: "1", display: "inline-block"}}>My SubGreddiits</button>
                <button type="button" className="btn btn-primary flex-grow-1" onClick={showAllUsers} style={{zIndex: "1", display: "inline-block"}}>Users</button>
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