import {Route,Routes } from "react-router-dom";
import Header from "./components/Header";
import Movies from "./components/Movies/Movies";
import Homepage from "./components/Homepage";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./redux/store";
import Booking from "./components/Booking/Booking";
import UserProfile from "./Profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./Profile/AdminProfile";

function App() {
  const dispatch=useDispatch();
  const isAdminLoggedIn = useSelector((state)=>state.admin?.isLoggedIn)
  const isUserLoggedIn = useSelector((state)=>state.user?.isLoggedIn)
  console.log("admin",isAdminLoggedIn);
  console.log("user",isUserLoggedIn);
useEffect(()=>{
  if(localStorage.getItem("userId")){
      dispatch(userActions.login())
  }else if(localStorage.getItem("adminId")){
    dispatch(adminActions.login())

  }
},[dispatch])

  return (
    <div className="App">
      <Header/>
      <section>
        
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/movies" element={<Movies/>}/>
         {!isAdminLoggedIn && !isUserLoggedIn && <> <Route path="/admin" element={<Admin/>}/>
            <Route path="/auth" element={<Auth/>}/></> }
        { isAdminLoggedIn && !isUserLoggedIn && <><Route path="/add" element={<AddMovie/>}/>
          <Route path="/profile-admin" element={<AdminProfile/>}/></>}
{  isUserLoggedIn && !isAdminLoggedIn &&  <>     <Route path="/user" element={<UserProfile/>}/>
          <Route path="/booking/:id" element={<Booking/>}/></> }


        </Routes>
      </section>

    </div>
  );
}

export default App;
