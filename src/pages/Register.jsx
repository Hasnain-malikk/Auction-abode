import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";
import { registerUser } from "../services/authService";
const Register = () => {
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      let payload={username:userData.name,email:userData.email, password:userData.password,role:"Seller"}
      const response = await registerUser(payload);
      login(response);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed, please try again.");
    }
  };

  return (
    <motion.div
      className="d-flex align-items-center justify-content-center min-vh-100 bg-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
          <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
      <motion.div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "12px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h3 className="text-center text-primary fw-bold">Join Auction Abode</h3>
        <p className="text-center text-muted">Create your account</p>

        {error && (
          <motion.div
            className="alert alert-danger"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label text-muted">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={userData.password}
                onChange={handleChange}
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
          <div className="mb-3">
            <label className="form-label text-muted">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-primary fw-bold">Login</Link>
        </p>
         <p className="text-center">
                    <Link to="/" className="text-primary fw-bold">Home</Link>
                  </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
