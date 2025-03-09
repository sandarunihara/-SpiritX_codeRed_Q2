import React from 'react';
import homeBg from '../assets/home.jpg';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div 
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <Navbar/>
    </div>
  );
};

export default Home;