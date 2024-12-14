import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { api_base_url, toggleClass } from "../helper";
import GridCard from "./GridCard";

const Navbar = ({isGridLayout, setIsGridLayout}) => {
  const [data, setdata] = useState(null);
  const [error,setError] = useState("");
  const [isLightMode, setIsLightMode] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
     fetch(api_base_url + "/getUserDetails",{
      mode:"cors",
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        userId : localStorage.getItem("userId")
      })
     }).then(res=>res.json()).then(data => {
      if(data.success){
        setdata(data.user);
      }
      else{
        setError(data.message);
      }
     })
  }, []);
  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
    if (isLightMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";

  }

  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <img src={logo} alt="" className="w-[75px] rounded-[50%] cursor-pointer" />
        </div>
        <div className="links flex items-center gap-2 text-white">
          <Link className="Link">Home</Link>
          <Link className="Link">About</Link>
          <Link className="Link">Contact us</Link>
          <Link className="Link">Services</Link>
          <button onClick={logout} className="btnBlue bg-red-500 min-w-[80px] rounded-sm min-h-[30px] ml-2 cursor-pointer hover:bg-red-600 ">Log Out</button>
          <Avatar onClick={() => toggleClass(".dropDownNav","hidden")} name = {data ? data.name:""} className="cursor-pointer ml-2" size="40" round="50%" />
        </div>

        <div className="dropDownNav hidden absolute right-[30px] top-[60px] shadow-lg shadow-black bg-[#191919] w-[200px] h-[100px] text-white">
          <div className="py-[10px] border-b-[1px] border-b-[#fff]">
           <h3 className=" text-[20px] text-center " style={{lineHeight:1}}>{data ? data.username:"Loading..."}</h3>  
          </div> 
        
            <i className="flex items-center gap-2 mt-3 mb-2 ml-1 cursor-pointer" style={{fontStyle:"normal"}}><MdLightMode className="text-[20px]" /> <span onClick={toggleLightMode}>
            {isLightMode ? "Dark Mode" : "Light Mode"}
          </span></i>
            <i onClick={() => {setIsGridLayout(!isGridLayout)}} className="flex items-center gap-2 mt-3 mb-2 ml-1 cursor-pointer" style={{fontStyle:"normal"}}><IoGrid className="text-[20px]" /> {isGridLayout ? "List" : "Grid"} Layout</i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
