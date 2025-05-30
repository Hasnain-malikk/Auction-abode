import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <motion.nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="container-fluid">
        <motion.div
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}>
          <Link className="navbar-brand" to="/">
            Auction Abode 🏡
          </Link>
              </motion.div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay:0.6 }}>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              </motion.div>
              
              <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay:0.7 }}>

              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </li>
              </motion.div>
              <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2,delay:0.8 }}>

              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact Us
                </Link>
              </li>
              </motion.div>

              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/properties">
                      Properties
                    </Link>
                  </li>

                  {/* Profile Dropdown */}
                  <li className="nav-item dropdown">
                    <motion.a
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      href="#"
                      id="profileDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                         src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} 
                        alt="User Avatar"
                        className="rounded-circle me-2"
                        style={{ width: "35px", height: "35px" }}
                      />
                     {user.username}
                      
                    </motion.a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/changepassword">
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-danger"
                          onClick={()=>{
                            logout()
                            navigate('/')

                          }}
                          
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.9 }}>

                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
              </motion.div>
              <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.6,delay:1 }}>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
              </motion.div>
                </>
              )}
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
