import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from 'react-router-dom';
import ProfilePage from "./ProfilePage";
import { BrowserRouter } from "react-router-dom";
import Update from "./Update"
import Followers from "./Followers"
import Following from "./Following"
import OtherProfilePage from "./AnotherProfilePage"
import MySubGreddiit from "./MySubGreddiitPage"
import SubGreddiitForm from "./SubGreddiitForm";
import SubModule from "./SubModule";
import UsersList from "./UsersList";

function App() {
    // to know if u r in login or register page
    var [currentForm, setCurrentForm] = useState("login")

    const toggleForm = (formName) => { setCurrentForm(formName); }

    return <div>
        {/*To provide different locations at different routes*/}

        <BrowserRouter>
            <Routes>
            <Route path="/" element={currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/update" element={<Update />} />
            <Route path="/followers" element={<Followers />} />
            {/* <Route path="/following" element={<Following />} /> */}
            <Route path="/anotherprofiledata/:username" element={<OtherProfilePage />} />
            {/* <Route path="/followerslist" element={<Followers />} /> */}
            <Route path="/following" element={<Following />} /> 
            <Route path="/mysubgreddiits" element={<MySubGreddiit />} />
            <Route path="/subgreddiitform" element={<SubGreddiitForm />} />
            <Route path="/submodule/:username" element={<SubModule />} />
            <Route path="/submodule/:subgreddiitname/users" element={<UsersList />} />
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;