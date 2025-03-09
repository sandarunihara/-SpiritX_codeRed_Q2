import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ admin = false }) => {
  const { authState, logout } = useContext(AuthContext);

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
          <div className="flex space-x-4 font-bold text-lg">
            <Link
              to={"/myteam"}
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
            {authState.user ? (
              <button
                onClick={logout}
                className="bg-transparent border border-black px-5 py-2 rounded-xl flex justify-center items-center text-white hover:bg-black transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent border border-black px-5 py-2 rounded-xl flex justify-center items-center text-white hover:bg-black transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-black px-5 py-2 rounded-xl flex justify-center items-center text-white hover:bg-white hover:border-white hover:text-black transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
