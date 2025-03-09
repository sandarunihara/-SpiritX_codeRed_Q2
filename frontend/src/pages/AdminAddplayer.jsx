import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddplayer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    category: "",
    totalRuns: "",
    ballsFaced: "",
    inningsPlayed: "",
    wickets: "",
    oversBowled: "",
    runsConceded: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response=await fetch('http://localhost:5050/api/auth/addplayer',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })
    const responsedata=await response.json(); 
    if(responsedata.success){
        toast.success(responsedata.message);
        navigate('/');
    }else{
        toast.error(responsedata.message)
    }
  };

  
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#000000]/95 via-[#010a0a]/95 to-[#06b7b4]/95">
      <Navbar admin={true} />
      <div className="flex w-screen h-[calc(100%-4rem)] ">
        <div className="w-1/4 bg-black/50 backdrop-blur-md p-4">
          <ul className="flex flex-col space-y-8 justify-center items-center">
            <Link
              to={"/admin"}
              className="text-white font-bold  w-full text-center py-3 rounded-2xl hover:bg-green-400/50 transition-all duration-300"
            >
              Leaderboard
            </Link>
            <Link
              to={"/admin/addplayer"}
              className="text-white bg-green-400 font-bold w-full text-center py-3 rounded-2xl "
            >
              Add Player
            </Link>
            <Link
              to={"/admin/player"}
              className="text-white font-bold w-full text-center py-3 rounded-2xl hover:bg-green-400/50 transition-all duration-300"
            >
              Players
            </Link>
          </ul>
        </div>
        <div className="w-3/4 overflow-x-hidden p-10 flex justify-center items-center">
          <div className="bg-white rounded-xl p-4 w-3/4">
            <form
              className=" flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full justify-between gap-5">
                <div className="w-1/2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    
                  />
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="university"
                    className="block text-sm font-medium text-gray-700"
                  >
                    University
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  
                />
              </div>
              <div className="flex w-full justify-between gap-5">
                <div className="w-1/2">
                  <label
                    htmlFor="totalRuns"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Runs
                  </label>
                  <input
                    type="number"
                    id="totalRuns"
                    name="totalRuns"
                    value={formData.totalRuns}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    
                  />
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="ballsFaced"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Balls Faced
                  </label>
                  <input
                    type="number"
                    id="ballsFaced"
                    name="ballsFaced"
                    value={formData.ballsFaced}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    
                  />
                </div>
              </div>
              <div className="flex w-full justify-between gap-5">
                <div className="w-1/2">
                  <label
                    htmlFor="inningsPlayed"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Innings Played
                  </label>
                  <input
                    type="number"
                    id="inningsPlayed"
                    name="inningsPlayed"
                    value={formData.inningsPlayed}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="runsConceded"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Runs Conceded
                  </label>
                  <input
                    type="number"
                    id="runsConceded"
                    name="runsConceded"
                    value={formData.runsConceded}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    
                  />
                </div>
              </div>
              <div className="flex w-full justify-between gap-5">
                <div className="w-1/2">
                  <label
                    htmlFor="wickets"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Wickets
                  </label>
                  <input
                    type="number"
                    id="wickets"
                    name="wickets"
                    value={formData.wickets}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    
                  />
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="oversBowled"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Overs Bowled
                  </label>
                  <input
                    type="number"
                    id="oversBowled"
                    name="oversBowled"
                    value={formData.oversBowled}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddplayer;
