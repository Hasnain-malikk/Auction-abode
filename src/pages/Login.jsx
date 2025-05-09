import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion"; 
import { loginUser } from "../services/authService";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload={email, password}
      const response = await loginUser(payload);
      login(response); 
      navigate("/");
    } catch (err) {
      setError("Invalid password");
    }
  };

  return (
    <motion.div
      className="d-flex align-items-center justify-content-center min-vh-100 bg-dark"
      // initial={{ opacity: 0, y: 50 }} 
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: -50 }} 
      // transition={{ duration: 0.5 }}
    >
      <motion.div
        // whileHover={{ scale: 1.02 }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}    
      >
        <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "12px" }}>
          <h3 className="text-center text-primary fw-bold">Welcome Back!</h3>
          <p className="text-center text-muted">Login to Auction Abode</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <label className="form-label text-muted">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} 
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <motion.button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)} 
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </motion.button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register" className="text-primary fw-bold">Register</Link>
          </p>
          <p className="text-center">
            <Link to="/" className="text-primary fw-bold">Home</Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
