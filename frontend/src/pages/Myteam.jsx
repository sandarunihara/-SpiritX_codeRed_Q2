import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Myteam = () => {
  const { authState } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const [addedPlayers, setAddedPlayers] = useState([]);

  useEffect(() => {
    console.log(`Logged in user's team name: ${authState.user?.teamname}`);
  }, [authState]);

  const fetchdata = async () => {
    const response = await fetch("http://localhost:5050/api/auth/allplayers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responsedata = await response.json();
    setPlayers(responsedata.data);
  };

  const fetchAddedPlayers = async () => {
    const response = await fetch(`http://localhost:5050/api/auth/team/${authState.user.teamname}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responsedata = await response.json();
    const playerIds = responsedata.data.map(player => player._id);
    const addedPlayersData = await Promise.all(
      playerIds.map(async (id) => {
        const playerResponse = await fetch(`http://localhost:5050/api/auth/player/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return await playerResponse.json();
      })
    );
    setAddedPlayers(addedPlayersData.map(playerData => playerData.data));
  };

  useEffect(() => {
    fetchdata();
    fetchAddedPlayers();
  }, [authState]);

  const handleAddPlayer = async (player) => {
    console.log(authState.user);
    
    try {
      console.log(`User ID: ${authState.user?.id}`); // Verify User ID
      if (!authState.user?.id) {
        throw new Error("User ID is undefined");
      }
      const res = await fetch("http://localhost:5050/api/auth/addplayertoteam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerid: player._id,
          teamname: authState.user.teamname, // Use team name from auth context
          userid: authState.user.id, // Pass user ID
        }),
      });

      const resData = await res.json();
      console.log(resData);

      if (res.ok && resData.success) {
        setAddedPlayers((prev) => [...prev, player]);
      } else {
        alert("Failed to add player: " + resData.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error adding player: " + err.message);
    }
  };

  const defaultImage = "https://www.w3schools.com/w3images/avatar2.png";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#000000]/95 via-[#010a0a]/95 to-[#06b7b4]/95">
      <Navbar admin={true} />
      <div className="w-full px-6 py-10 flex flex-col lg:flex-row gap-6">
        {/* All Players */}
        <div className="bg-white p-6 rounded-md shadow-lg w-full lg:w-1/2 h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            All Players
          </h2>
          <ul className="space-y-4">
            {players
              .filter((player) => !addedPlayers.some((added) => added._id === player._id))
              .map((player, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={player.image || defaultImage}
                        alt={player.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <strong className="text-lg text-gray-800">{player.name}</strong>
                        <p className="text-sm text-gray-600">{player.university}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end sm:items-center sm:flex-row sm:gap-4">
                      <span className="text-sm font-medium text-indigo-600">
                        {player.category}
                      </span>
                      <button
                        onClick={() => handleAddPlayer(player)}
                        className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all duration-200"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <Link
                    to="/playerpro"
                    state={{
                      name: player.name,
                      university: player.university,
                    }}
                    className="text-indigo-600 mt-2 inline-block"
                  >
                    View Details
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Added Players */}
        <div className="bg-white p-6 rounded-md shadow-lg w-full lg:w-1/2 h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Added Players
          </h2>
          {addedPlayers.length === 0 ? (
            <p className="text-center text-gray-500">No players added yet.</p>
          ) : (
            <ul className="space-y-4">
              {addedPlayers.map((player, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={player.image || defaultImage}
                      alt={player.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <strong className="text-lg text-gray-800">{player.name}</strong>
                      <p className="text-sm text-gray-600">{player.university}</p>
                      <span className="text-sm font-medium text-indigo-600">
                        {player.category}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myteam;
