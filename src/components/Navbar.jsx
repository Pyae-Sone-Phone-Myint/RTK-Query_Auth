import React from "react";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/services/authSlice";
import {CgProfile} from "react-icons/cg"

const Navbar = () => {
  const user = JSON.parse(Cookies.get("user"))
  const token = JSON.parse(Cookies.get("token"))
  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch()

  const logoutHandler = async () => {
      const {data} = await logout(token);
      dispatch(removeUser())
      if(data?.success) nav('/login')
  }
  // console.log(token);
  return (
    <div className="flex justify-between px-10 py-3 shadow">
      <h1 className=" text-2xl">MMSIT</h1>
      <div className=" ml-auto mr-3 flex items-center gap-1">
        <p>{user?.name}</p>
        <CgProfile className=" text-blue-400"/>
      </div>
      <button onClick={logoutHandler} className=" py-1 px-2 rounded border-2 border-blue-500 text-sm font-semibold">Logout</button>
    </div>
  );
};

export default Navbar;
