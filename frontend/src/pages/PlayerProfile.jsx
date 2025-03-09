import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PlayerProfile = () => {
  const [playerde, setPlayerde] = useState({ name: "", university: "" });
  const [player, setPlayer] = useState({});

  const location = useLocation();
      const { name, university } = location.state;
  

  const fetchdata=async()=>{
    const response =await fetch(`http://localhost:5050/api/auth/findplayer/${name}/${university}`,{
        method:'get',
        headers:{
            'Content-Type':'application/json'
        },
        
    })
    const responsedata=await response.json()
    setPlayer(responsedata.data)
    
}
useEffect(() => {
    fetchdata();
}, [playerde]);

console.log(player);

  const defaultImage = "https://www.w3schools.com/w3images/avatar2.png"; // default profile pic URL
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
              className="text-white  font-bold w-full text-center py-3 rounded-2xl hover:bg-green-400/50 transition-all duration-300"
            >
              Add Player
            </Link>
            <Link
              to={"/admin/player"}
              className="text-white bg-green-400 font-bold w-full text-center py-3 rounded-2xl"
            >
              Players
            </Link>
          </ul>
        </div>
        {/* saadasd */}
        <div className="w-3/4 overflow-x-hidden p-10 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl  w-full h-full">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src={defaultImage}
                alt={player.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
              />
              <div>
                <h2 className="text-3xl font-semibold text-gray-800">
                  {player.name}
                </h2>
                <p className="text-lg text-gray-600">{player.university}</p>
                <span className="text-sm font-medium text-indigo-600">
                  {player.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Batting Statistics */}
              <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  Batting Statistics
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>
                    <strong>Total Runs:</strong> {player.totalRuns || "N/A"}
                  </li>
                  <li>
                    <strong>Balls Faced:</strong> {player.ballsFaced || "N/A"}
                  </li>
                  <li>
                    <strong>Innings Played:</strong>{" "}
                    {player.inningsPlayed || "N/A"}
                  </li>
                  <li>
                    <strong>Batting Average:</strong>{" "}
                    {player.battingAverage || "N/A"}
                  </li>
                  <li>
                    <strong>Strike Rate:</strong>{" "}
                    {player.battingstrikerate || "N/A"}
                  </li>
                </ul>
              </div>

              {/* Bowling Statistics */}
              <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  Bowling Statistics
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>
                    <strong>Wickets:</strong> {player.wickets || "N/A"}
                  </li>
                  <li>
                    <strong>Overs Bowled:</strong> {player.oversBowled || "N/A"}
                  </li>
                  <li>
                    <strong>Runs Conceded:</strong>{" "}
                    {player.runsConceded || "N/A"}
                  </li>
                  <li>
                    <strong>Economy Rate:</strong> {player.economyRate || "N/A"}
                  </li>
                  <li>
                    <strong>Bowling Strike Rate:</strong>{" "}
                    {player.bowlingstrikerate || "N/A"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Player Points & Value */}
              <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  Player Information
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>
                    <strong>Player Points:</strong>{" "}
                    {player.playerpoints || "N/A"}
                  </li>
                  <li>
                    <strong>Value in Rupees:</strong>{" "}
                    {player.playervalue || "N/A"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
