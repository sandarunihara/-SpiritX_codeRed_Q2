// import React, { useContext } from 'react';
// import homeBg from '../assets/home.jpg';
// import Navbar from '../components/Navbar';
// import { AuthContext } from '../Context/AuthContext';

// const Home = () => {
 
  
//   return (
//     <div 
//       className="h-screen w-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${homeBg})` }}
//     >
//       <Navbar/>
//     </div>
//   );
// };

// export default Home;

import React, { useContext } from 'react';
import homeBg from '../assets/home.jpg';
import Navbar from '../components/Navbar';
import { AuthContext } from '../Context/AuthContext';

const Home = () => {
  return (
    <div 
      className="h-screen w-screen bg-cover bg-center flex flex-col "
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <Navbar />
      <div className="bg-black/60 p-8 rounded-lg max-w-3xl mx-auto my-auto text-white">
        <h1 className="text-4xl font-bold">Welcome to Spirit11 Fantasy Cricket League</h1>
        <p className="mt-4 text-lg">
        Step into the world of fantasy cricket and bring your passion for the game to life! 
        </p>
        <p className="mt-4 text-lg">
          Introducing <span className="font-semibold text-green-400">Spirit11</span> gives you the chance to draft real university cricket players, track their stats, and compete with friends and other cricket enthusiasts for the top spot.
        </p>
        <p className="mt-4 text-lg">
        Are you ready to build the winning team?🚀
        </p>
      </div>
    </div>
  );
};

export default Home;
