import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isCreateModelShow, setisCreateModelShow] = useState(false);
  const [proTitle, setProTitle] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // To store search input
  const [isGridLayout, setIsGridLayout] = useState(false);
  // Filtered data based on search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const createProject = (e) => {
    if (proTitle === "") {
      alert("Please enter project title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: proTitle,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setisCreateModelShow(false);
            setProTitle("");
            alert("Project created successfully");
            navigate(`editor/${data.projectId}`);
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  const getProjects = (e) => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.projects);
        } else {
          setError(data.message);
        }
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState("");;

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setUserData(data.user);
      }
      else {
        setUserError(data.message);
      }
    })
  }, []);

  return (
    <>
      <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout}/>
      <div className="flex items-center justify-between px-[100px] my-[40px]">
        <h2 className="text-3xl font-semibold font">Hi, {userData ? userData.name:""} </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="inputB !w-[350px]">
            <input type="text" placeholder="Search heare..!" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
          <button
            onClick={() => {
              setisCreateModelShow(!isCreateModelShow);
            }}
            className="btn  !p[50px] !px-[10px]"
          >
            +
          </button>
        </div>
      </div>

      <div className="cards text-white">
        {isGridLayout ? (
         <div className="grid px-[100px]">
         {filteredData.length > 0 ? (
           filteredData.map((item, index) => (
             <GridCard key={index} item={item} />
           ))
         ) : (
           <p>No results found</p>
         )}
       </div>
     ) : (
       <div className="list px-[100px]">
         {filteredData.length > 0 ? (
           filteredData.map((item, index) => (
             <ListCard key={index} item={item} />
           ))
         ) : (
           <p>No results found</p>
         )}
       </div>
        )}
      </div>

      {isCreateModelShow ? (
        <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.1)] flex items-center justify-center">
          <div className="createModel w-[35vw] h-[23vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
            <h3 className="text-2xl">New project </h3>
            <div className="input bg-[#202020]  cursor-pointer mt-4 w-[100%] rounded-md">
              <input className="text-start m-1 "
                type="text"
                onChange={(e) => {
                  setProTitle(e.target.value);
                }}
                value={proTitle}
                placeholder="Enter the title.."
              />
            </div>

            <div className="flex w-full mt-[10%] items-center gap-[10px]">
              <button
                onClick={createProject}
                className="p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setisCreateModelShow(!isCreateModelShow);
                }}
                className="p-[10px] rounded-lg bg-[#2f2323] text-white cursor-pointer min-w-[49%]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
