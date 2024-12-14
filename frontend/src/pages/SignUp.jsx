import React, { useState } from 'react'
import logo from '../assets/images/logo.webp'
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../assets/images/authPageSide.png'
import { api_base_url } from '../helper';
const SignUp = () => {
  const [userName, setUserName] = useState("");
	const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");	
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp",{
      mode:"cors",
      method:"POST",
      headers:{
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        userName:userName,
        name:name,
        email:email,
        password:password,
      })
    }).then((res) => res.json()).then((data)=>{
      if(data.success === true){
        alert("Account created successfully");
        navigate("/login");
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
                onChange ={(e) => {setUserName(e.target.value)}}
                value = {userName}
                type="text" placeholder='User name.. '
                 />

              </div>

              <div className="inputBox">
                <input required
                onChange={(e) => {
                  setName(e.target.value)
                }} value={name}
                type="text" placeholder='Name' />
              </div>

              <div className="inputBox">
                <input required
                onChange={(e) => {
                  setEmail(e.target.value)
                }} value={email}
                type="email" placeholder='Email' />
              </div>

              <div className="inputBox">
                <input required
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                value={password}
                type="text" placeholder='Password' />
              </div>
              
              <p>Already have an account ?
                 
                <Link to="/login" className='ml-2 text-blue-500'>
                 Login
                </Link>
              </p>

              <p className='text-red-500 text-[12px] my-2'>{error}</p>

              <button className="btn w-full">Sign Up</button>
            </form>

        </div>
        <div className="right w-[55%]">
           <img src={signupImg} alt="0" className='w-[100%] h-[100vh] object-cover' />
        </div>
    </div>
   </>
  )
}

export default SignUp