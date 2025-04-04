import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
// import '../styles/navbar.css'
const navbarVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.2 } },
};

function Navbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const token = localStorage.getItem("token");
  const userName = token ? JSON.parse(atob(token.split(".")[1])).name : null;
  console.log(userName);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/register");
  };

  return (
    <div className="bg_all">
      <motion.div
        className="text-white flex justify-between  items-center mx-auto px-4"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        style={{ position: showMenu ? "absolute" : "relative" }}
      >
        <h1 className="w-full text-3xl font-bold text">TrustCure</h1>
        <div className="lg:flex hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
          >
            <ul className="flex uppercase font-bold text-white">
              <li className="p-4 cursor-pointer">
                <Link to="/home" style={{ color: "rgb(40,48,115)" }}>
                  Home
                </Link>
              </li>
              <li className="p-4 cursor-pointer">
                <Link to="/about" style={{ color: "rgb(40,48,115)" }}>
                  About
                </Link>
              </li>
              <li className="p-4 cursor-pointer">
                <Link to="/feeback" style={{ color: "rgb(40,48,115)" }}>
                  FeedBack
                </Link>
              </li>
              {userName ? (
                <li className="p-3 cursor-pointer fontprofile">
                  <a>{`Hey! ${userName}`}</a>
                  <ul className="dropdown">
                    <li className="p-2">
                      <Link tof="/profile">Profile</Link>
                    </li>
                    <li className="p-2">
                      <Link onClick={handleLogout} to="/login">
                        Logout
                      </Link>
                    </li>
                  </ul>{" "}
                </li>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className=" hover:scale-110 duration-500 text-white bg-[rgb(40,48,115)] w-[150px] rounded-md font-medium    text-dark mt-3 text-center pr-12 mr-2"
                >
                  Login
                </button>
              )}
            </ul>
          </motion.div>
        </div>
        <div className="lg:hidden">
          {showMenu ? (
            <AiOutlineClose
              size={30}
              onClick={toggleMenu}
              className="cursor-pointer"
              title="Close Menu"
            />
          ) : (
            <AiOutlineMenu
              size={30}
              onClick={toggleMenu}
              className="cursor-pointer"
              title="Open Menu"
            />
          )}
        </div>
        {showMenu && (
          <div className="fixed left-0 top-0 w-[60%] border-r border-r-gray-900 bg-black ease-in-out duration-9000">
            <ul className="pt-24 uppercase text-white">
              <li className="p-4 border-r cursor-pointer border-l m-3">Home</li>
              <li className="p-4 border-r cursor-pointer border-l m-3">
                About
              </li>
              <li className="p-4 border-r border-l m-3">FeedBack</li>
              {token ? (
                "hello"
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-[rgb(40,48,115)]"
                >
                  <li className="p-4 border-r border-l m-3">Login</li>
                </button>
              )}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Navbar;
