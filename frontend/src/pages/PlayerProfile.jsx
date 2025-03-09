import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlayerProfile = () => {
  const { authState } = useContext(AuthContext);
  const [player, setPlayer] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const { name, university } = location.state;

  const fetchdata = async () => {
    const response = await fetch(
      `http://localhost:5050/api/auth/findplayer/${name}/${university}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responsedata = await response.json();
    setPlayer(responsedata.data);
    setFormData(responsedata.data);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    const response = await fetch("http://localhost:5050/api/auth/updateplayer",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const responsedata = await response.json();
    if (responsedata.success) {
      toast.success(responsedata.message);
      setIsEditing(false);
      fetchdata(); // Refresh data after update
    } else {
      toast.error(responsedata.message);
    }
  };

  const handleDelete = async () => {
    const response = await fetch("http://localhost:5050/api/auth/deleteplayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, university }),
    });

    const responsedata = await response.json();
    if (responsedata.success) {
      toast.success(responsedata.message);
      navigate("/admin/player");
    } else {
      toast.error(responsedata.message);
    }
  };


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
                {isEditing ? (
                  <>
                    
                    <h2 className="text-3xl font-semibold text-gray-800">
                      {player.name}
                    </h2>
                    <p className="text-lg text-gray-600">{player.university}</p>
                    <input
                      type="text"
                      name="category"
                      value={formData.category || ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg mt-2"
                      placeholder="Category"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-semibold text-gray-800">
                      {player.name}
                    </h2>
                    <p className="text-lg text-gray-600">{player.university}</p>
                    <span className="text-sm font-medium text-indigo-600">
                      {player.category}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {authState.user?.role === "admin" && (
              <div className="flex space-x-4">
              <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
                Delete
              </button>
            </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Editable Batting Stats */}
                  <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">
                      Batting Statistics
                    </h3>
                    <input
                      type="number"
                      name="totalRuns"
                      value={formData.totalRuns || ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Total Runs"
                    />
                    <input
                      type="number"
                      name="ballsFaced"
                      value={formData.ballsFaced || ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg mt-2"
                      placeholder="Balls Faced"
                    />
                    <input
                      type="number"
                      name="inningsPlayed"
                      value={formData.inningsPlayed || ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg mt-2"
                      placeholder="Innings Played"
                    />
                  </div>

                  {/* Editable Bowling Stats */}
                  <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">
                      Bowling Statistics
                    </h3>
                    <input
                      type="number"
                      name="wickets"
                      value={formData.wickets || ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Wickets"
                    />
                    <input
                      type="number"
                      name="oversBowled"
                      value={formData.oversBowled || ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg mt-2"
                      placeholder="Overs Bowled"
                    />
                    <input
                      type="number"
                      name="runsConceded"
                      value={formData.runsConceded || ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg mt-2"
                      placeholder="Runs Conceded"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
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
                        <strong>Balls Faced:</strong>{" "}
                        {player.ballsFaced || "N/A"}
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
                        <strong>Overs Bowled:</strong>{" "}
                        {player.oversBowled || "N/A"}
                      </li>
                      <li>
                        <strong>Runs Conceded:</strong>{" "}
                        {player.runsConceded || "N/A"}
                      </li>
                      <li>
                        <strong>Economy Rate:</strong>{" "}
                        {player.economyRate || "N/A"}
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
              </>
            )}

            {/* adsadasd */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;

// import React, { useContext, useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";
// import { toast } from "react-toastify";

// const PlayerProfile = () => {
//   const { authState } = useContext(AuthContext);
//   const [player, setPlayer] = useState({});
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);

//   const location = useLocation();
//   const { name, university } = location.state;

//   const fetchdata = async () => {
//     const response = await fetch(
//       `http://localhost:5050/api/auth/findplayer/${name}/${university}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const responsedata = await response.json();
//     setPlayer(responsedata.data);
//     setFormData(responsedata.data); // Pre-fill form with existing data
//   };

//   useEffect(() => {
//     fetchdata();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5050/api/auth/updateplayer", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const responsedata = await response.json();
//     if (responsedata.success) {
//       toast.success(responsedata.message);
//       setIsEditing(false);
//       fetchdata(); // Refresh data after update
//     } else {
//       toast.error(responsedata.message);
//     }
//   };

//   const defaultImage = "https://www.w3schools.com/w3images/avatar2.png"; // default profile pic URL

//   return (
//     <div className="h-screen w-screen bg-gradient-to-b from-[#000000]/95 via-[#010a0a]/95 to-[#06b7b4]/95">
//       <Navbar admin={true} />
//       <div className="flex w-screen h-[calc(100%-4rem)]">
//         <div className="w-1/4 bg-black/50 backdrop-blur-md p-4">
//           <ul className="flex flex-col space-y-8 justify-center items-center">
//             <Link to={"/admin"} className="text-white font-bold w-full text-center py-3 rounded-2xl hover:bg-green-400/50 transition-all duration-300">
//               Leaderboard
//             </Link>
//             <Link to={"/admin/addplayer"} className="text-white font-bold w-full text-center py-3 rounded-2xl hover:bg-green-400/50 transition-all duration-300">
//               Add Player
//             </Link>
//             <Link to={"/admin/player"} className="text-white bg-green-400 font-bold w-full text-center py-3 rounded-2xl">
//               Players
//             </Link>
//           </ul>
//         </div>

//         {/* Player Profile & Edit Form */}
//         <div className="w-3/4 overflow-x-hidden p-10 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-full">
//             <div className="flex items-center space-x-6 mb-6">
//               <img src={defaultImage} alt={player.name} className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500" />
//               <div>
//                 {isEditing ? (
//                   <>
//                     <input type="text" name="name" value={formData.name || ""} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Player Name" />
//                     <input type="text" name="university" value={formData.university || ""} onChange={handleChange} className="w-full p-2 border rounded-lg mt-2" placeholder="University" />
//                     <input type="text" name="category" value={formData.category || ""} onChange={handleChange} className="w-full p-2 border rounded-lg mt-2" placeholder="Category" />
//                   </>
//                 ) : (
//                   <>
//                     <h2 className="text-3xl font-semibold text-gray-800">{player.name}</h2>
//                     <p className="text-lg text-gray-600">{player.university}</p>
//                     <span className="text-sm font-medium text-indigo-600">{player.category}</span>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Edit Mode */}
//             {authState.user?.role === "admin" && (
//               <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
//                 {isEditing ? "Cancel" : "Edit"}
//               </button>
//             )}

//             {isEditing ? (
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Editable Batting Stats */}
//                   <div className="bg-gray-50 p-5 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-gray-700 mb-3">Batting Statistics</h3>
//                     <input type="number" name="totalRuns" value={formData.totalRuns || ""} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Total Runs" />
//                     <input type="number" name="ballsFaced" value={formData.ballsFaced || ""} onChange={handleChange} className="w-full p-2 border rounded-lg mt-2" placeholder="Balls Faced" />
//                     <input type="number" name="inningsPlayed" value={formData.inningsPlayed || ""} onChange={handleChange} className="w-full p-2 border rounded-lg mt-2" placeholder="Innings Played" />
//                   </div>

//                   {/* Editable Bowling Stats */}
//                   <div className="bg-gray-50 p-5 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-gray-700 mb-3">Bowling Statistics</h3>
//                     <input type="number" name="wickets" value={formData.wickets || ""} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Wickets" />
//                     <input type="number" name="oversBowled" value={formData.oversBowled || ""} onChange={handleChange} className="w-full p-2 border rounded-lg mt-2" placeholder="Overs Bowled" />
//                     <input type="number" name="runsConceded" value={formData.runsConceded || ""} onChange={handleChange} className="w-full p-2 border rounded-lg mt-2" placeholder="Runs Conceded" />
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg">Save Changes</button>
//                 </div>
//               </form>
//             ) : (
//               <>
//                 <p><strong>Batting Avg:</strong> {player.battingAverage}</p>
//                 <p><strong>Strike Rate:</strong> {player.battingstrikerate}</p>
//                 <p><strong>Economy Rate:</strong> {player.economyRate}</p>
//                 <p><strong>Bowling Strike Rate:</strong> {player.bowlingstrikerate}</p>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlayerProfile;
