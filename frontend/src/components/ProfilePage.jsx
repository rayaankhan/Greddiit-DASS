import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
function ProfilePage() {

    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem("login") === null) {
            navigate("/");
        }
    });

    function toLogOut() {
        window.localStorage.removeItem("login");
        navigate("/");
    }

    const [userDetails, setUserDetails] = useState({
      firstName: '',
      lastName: '',
      age: '',
      userName: ''
  })
    const [profileDetails, setProfileDetails] = useState({
      about: '',
      followersNumber: -1,
      followingNumber: -1
    })

    
    const tok = window.localStorage.getItem("userToken");
    useEffect(() => {
        axios.post("http://localhost:9002/getprevvalues",{token : tok})
        .then((res) => {
          var getdata = res.data.values;
          var profdata = res.data.profileData
          setUserDetails({
            firstName: getdata.firstName,
            lastName: getdata.lastName,
            age: getdata.age,
            userName: getdata.userName
          })
          console.log(profileDetails)
          setProfileDetails({
            about: profdata.about,
            followersNumber: profdata.followersNumber,
            followingNumber: profdata.followingNumber
          })
          console.log(profileDetails)
        }).catch((err) => {
            console.log(err);
          });
  }, []);


    const getFollowers = () => {
      navigate("/followers")
    }

    const getFollowing = () => {
      navigate("/following")
    }

    const [whatYouSearch, setWhatYouSearch] = useState("")
    const toSearch = (e) => {
      const value = e.target.value
      setWhatYouSearch(value)
      console.log(e.target.value)
    }
    
    const sendToSearch = () => {
      axios.post("http://localhost:9002/toSearch", {token: tok, searchIt: whatYouSearch})
      .then((res) => {
        // console.log(res.data.message)
        if(res.data.message === 1)
        {
          // alert("Found a profile")
          const user = res.data.values.userName
          // alert(user)
          navigate("/anotherprofiledata/"+user)
        }
        else if(res.data.message === 2){
          console.log("hereitis")
          navigate("/submodule/"+res.data.greddiit.name)
        }
        else if(res.data.message === 0)
        {
          alert("Nothing found")
        }
      }).catch((err) =>{
        console.log(err);
    })
    }


    return <>
    <Navbar />
        <section className="h-100 gradient-custom-2">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-9 col-xl-7">
        <div className="card">
          <div class="input-group rounded">
            <input type="search" onChange={toSearch} value={whatYouSearch} class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
            <button type="button" onClick={sendToSearch} class="btn btn-primary">
              <i class="fas fa-search"></i>
            </button>
            </span>
          </div>
          <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#000", height:"200px"}}>
            <div className="ms-4 mt-5 d-flex flex-column" style={{width: "150px"}}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                alt="Generic placeholder" className="img-fluid img-thumbnail mt-4 mb-2"
                style={{width: "150px", zIndex: "1"}} />
              <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                onClick={()=>{navigate("/update")}} style={{zIndex: "1", display: "inline-block"}}>
                Edit details
              </button>
              <div className="d-flex pt-1">
                <button type="button" className="btn btn-primary flex-grow-1" onClick={toLogOut} style={{zIndex: "1", display: "inline-block"}}>Log Out</button>
              </div>
              <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                onClick={()=>{navigate("/mysubgreddiits")}} style={{zIndex: "1", display: "inline-block"}}>
                My SubGreddiits
              </button>
            </div>
            <div className="ms-3" style={{marginTop: "120px"}}>
              <h5>{userDetails.firstName} {userDetails.lastName}</h5>
              <p>@{userDetails.userName}</p>
            </div>
          </div>
          <div className="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>
            <div className="d-flex justify-content-end text-center py-1">
              {/* <div>
                <p className="mb-1 h5">253</p>
                <p className="small text-muted mb-0">Photos</p>
              </div> */}
              <div className="px-3">
                <p className="mb-1 h5" onClick={getFollowers}>{profileDetails.followersNumber}</p>
                <p className="small text-muted mb-0">Followers</p>
              </div>
              <div>
                <p className="mb-1 h5" onClick={getFollowing}>{profileDetails.followingNumber}</p>
                <p className="small text-muted mb-0">Following</p>
              </div>
            </div>
          </div>
          <div className="card-body p-4 text-black" style={{marginTop: "30px"}}>
            <div className="mb-5">
              <p className="lead fw-normal mb-1">About</p>
              <div className="p-4" style={{backgroundColor: "#f8f9fa"}}>
                <p>{profileDetails.about}</p>
                {/* <p className="font-italic mb-1">Web Developer</p>
                <p className="font-italic mb-1">Lives in New York</p>
                <p className="font-italic mb-0">Photographer</p> */}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fw-normal 12mb-0">Recent photos</p>
              <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
            </div>
            <div className="row g-2">
              <div className="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                  alt="1" className="w-100 rounded-3" />
              </div>
              <div className="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                  alt="1" className="w-100 rounded-3" />
              </div>
            </div>
            <div className="row g-2">
              <div className="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                  alt="1" className="w-100 rounded-3" />
              </div>
              <div className="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                  alt="1" className="w-100 rounded-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
}


export default ProfilePage;