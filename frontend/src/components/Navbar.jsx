import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ admin = false }) => {
  return (
    <div className="font-poppins">
      <nav className={`flex justify-between items-center p-4 text-white ${admin ? 'bg-black': 'bg-white/10 backdrop-blur-md' }`}>
        <div>
          <Link to={"/"} className="font-poppins font-bold text-xl text-white">
            Spirit11
          </Link>
        </div>
        {admin && (
            <Link
            to={"/"}
            className="text-white px-2 py-1 rounded-full hover:bg-black transition-all duration-300"
          >
            Home
          </Link>
        )}
        {!admin && (
          <div className="flex space-x-4  font-bold text-lg">
            <Link
              to={"/"}
              className="text-white px-2 py-1 rounded-full hover:bg-black transition-all duration-300"
            >
              My Team
            </Link>
            <Link
              to={"/"}
              className="text-white px-2 py-1 rounded-full hover:bg-black transition-all duration-300"
            >
              Leaderboard
            </Link>
            <Link
              to={"/admin"}
              className="text-white px-2 py-1 rounded-full hover:bg-black transition-all duration-300"
            >
              Admin Panel
            </Link>
          </div>
        )}
        {!admin && (

        <div className="flex space-x-4">
          <Link
            to={"/"}
            className="bg-transparent border border-black px-5 py-2 rounded-xl flex justify-center items-center  text-white hover:bg-black transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to={"/"}
            className="bg-black px-5 py-2 rounded-xl flex justify-center items-center  text-white hover:bg-white hover:border-white hover:text-black transition-all duration-300"
          >
            SignUp
          </Link>
        </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
