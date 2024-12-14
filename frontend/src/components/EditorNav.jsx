import React from "react";
import logo from "../assets/images/logo.png";
import { MdOutlineFileDownload } from "react-icons/md";
const EditorNav = () => {
  return (
    <>
      <div className="Navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <img src={logo} alt="" className="w-[150px] cursor-pointer" />
        </div>
        <p>File / <span className="text-[gray]">My First Project</span></p>
        <i className="p-[5px] bg-black rounded-md cursor-pointer text-[20px]">
            <MdOutlineFileDownload />
        </i>
      </div>
    </>
  );
};

export default EditorNav;
