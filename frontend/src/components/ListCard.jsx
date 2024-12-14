import React, { useState } from "react";
import img from "../assets/images/code.png";
import del from "../assets/images/delete.png";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";

const ListCard = ({item}) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();
  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject",{
      mode:"cors",
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        projId:id,
        userId:localStorage.getItem("userId")
      })
    }).then((res) => res.json()).then((data) => {
      if(data.success){
        setIsDeleteModelShow(false);
        window.location.reload();
      }
      else{
        alert(data.message);
        setIsDeleteModelShow(false);
      }
    })
  }
  return (
    <>
      <div className="listCard flex items-center justify-between w-[full] p-[10px] mb-2 bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]">
        <div onClick={() => {navigate(`/editor/${item._id}`)}} className="flex items-center gap-2">
          <img className="w-[80px] " src={img} alt="" />
          <div>
            <h3 className="text-[22px]">{item.title}</h3>
            <p className="text-[gray] text-[15px]">Created by {new Date(item.date).toDateString()}</p>
          </div>
        </div>

        <div>
          <img className="w-[30px] cursor-pointer mr-4" onClick={() => setIsDeleteModelShow(!isDeleteModelShow)} src={del} alt="" />
        </div>
      </div>
     {
      isDeleteModelShow ?
      <div className="flex justify-center items-center flex-col model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)]">
      <div className="mainModel w-[35vw] h-[22vh] bg-[#141414] rounded-lg p-[20px]">
        <h3 className='text-2xl'>Do you want to delete 
          this project ?</h3>
      <div className="flex w-full mt-[10%] items-center gap-[10px]">
        <button onClick={() => {deleteProj(item._id)}} className="p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]">Delete</button>
        <button className="p-[10px] rounded-lg bg-[#2f2323] text-white cursor-pointer min-w-[49%]" 
        onClick={() => setIsDeleteModelShow(!isDeleteModelShow)}
        >Cancel</button>
      </div>
      </div>
    </div>
    : ""
     }
    </>
  );
};
export default ListCard;
