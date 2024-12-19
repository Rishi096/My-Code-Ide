import React, { useState } from 'react'
import logo from '../assets/images/logo.webp'
import { Link, useNavigate } from 'react-router-dom';
import LoginImg from '../assets/images/authPageSide.png'
import { api_base_url } from '../helper';
const Login = () => {
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");	
 const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(api_base_url+ "/login",{
      mode:"cors",
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({
         email:email,
         password:password
      })
    }).then(res => res.json()).then(data => {
        if(data.success === true){
          localStorage.setItem("token",data.token);
          localStorage.setItem("isLoggedIn",true);
          localStorage.setItem("userId",data.userId);
          window.location.href = "/";
        }
        else{
          setError(data.message);
        }
      })
  }
  return (
   <>

    <div className="container w-screen min-h-screen flex items-center justify-between text-white pl-[100px] "> 
        <div className="left w-[40%]">
            <img className='w-[200px]' src={logo} alt="*" />
            <form onSubmit={submitHandler} className='w-full mt-[60px]'>
              

              <div className="inputBox">
                <input required
                onChange={(e) => {
                  setEmail(e.target.value)
                }} value={email}
                type="text" placeholder='Email' />
              </div>

              <div className="inputBox">
                <input required
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                value={password}
                type="text" placeholder='Password' />
              </div>
        
              <p>Don't have an account ?
                 
                <Link to="/signup" className='ml-2 text-blue-500'>
                 SignUp
                </Link>
              </p>

              <p className='text-red-500 text-[12px] my-2'>{error}</p>
              <button className="btn w-full">Login</button>
            </form>
        </div>
        <div className="right w-[55%]">
           <img src={LoginImg} alt="0" className='w-[100%] h-[100vh] object-cover' />
        </div>
    </div>
   </>
  )
}
export default Login