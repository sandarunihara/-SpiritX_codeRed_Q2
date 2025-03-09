import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const AdminPlayers = () => {
  const [players, setPlayers] = useState([]);

  const navigate=useNavigate();

  const fetchdata = async () => {
    const response = await fetch("http://localhost:5050/api/auth/allplayers", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    const responsedata = await response.json();
    setPlayers(responsedata.data)
  };


  useEffect(() => {
    fetchdata();
  }, []);


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
        <div className="w-3/4 overflow-x-hidden p-10 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-lg h-full w-full overflow-y-auto ">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Player List
            </h2>
            <ul className="space-y-4">
              {players.map((player, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={player.image || defaultImage}
                        alt={player.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <strong className="text-lg text-gray-800">
                          {player.name}
                        </strong>
                        <p className="text-sm text-gray-600">
                          {player.university}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-indigo-600">
                      {player.category}
                    </span>
                  </div>
                  <Link
                    to="/playerpro"
                    state={{ name: player.name, university: player.university }}
                    className="text-indigo-600 mt-2 inline-block"
                  >
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPlayers;

// const AdminPlayers = () => {
//   const players = [
//       { name: "Virat Kohli", university: "Delhi University", category: "Batsman", image: "" },
//       { name: "Jasprit Bumrah", university: "Mumbai University", category: "Bowler", image: "" },
//       { name: "Joe Root", university: "Yorkshire University", category: "All-Rounder", image: "" },
//       { name: "Steve Smith", university: "Sydney University", category: "Batsman", image: "" },
//       { name: "Ben Stokes", university: "Durham University", category: "All-Rounder", image: "" }
//   ];

//   const defaultImage = "https://www.w3schools.com/w3images/avatar2.png"; // default profile pic URL

//   return (
//       <div className="bg-white p-5 rounded-md shadow-lg max-h-96 overflow-y-auto">
//           <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Player List</h2>
//           <ul className="space-y-4">
//               {players.map((player, index) => (
//                   <li
//                       key={index}
//                       className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
//                       <div className="flex justify-between items-center">
//                           <div className="flex items-center space-x-4">
//                               <img
//                                   src={player.image || defaultImage}
//                                   alt={player.name}
//                                   className="w-12 h-12 rounded-full object-cover"
//                               />
//                               <div>
//                                   <strong className="text-lg text-gray-800">{player.name}</strong>
//                                   <p className="text-sm text-gray-600">{player.university}</p>
//                               </div>
//                           </div>
//                           <span className="text-sm font-medium text-indigo-600">{player.category}</span>
//                       </div>
//                   </li>
//               ))}
//           </ul>
//       </div>
//   );
// };

// export default AdminPlayers;
