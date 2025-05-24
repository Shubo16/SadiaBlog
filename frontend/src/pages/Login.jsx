import React, { useState, useEffect } from "react";
import { Headerbackgroundimg } from "../services/randomPicGenerator";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { errorLogin } from "../components/extras/alerts";
import api from "../services/backendApi";

const Login = () => {
  const navigate = useNavigate("/");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imgData = await Headerbackgroundimg();
        setBackgroundImage(imgData);
      } catch (error) {
        console.error("Error loading background image:", error);
      }
    };
    loadImage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        `/api/login/password`,
        { email, password },

        {
          headers: {
            // 'headers' should be plural, not 'header'
            "Content-Type": "application/json",
          },
          withCredentials: true, // Allows cookies for session handling if needed
        }
      );
      // successFullNotify();

      if (response.status === 200) {
        setTimeout(() => {
          navigate("/");
          // Redirect after a delay
        }, 1000);
      }

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      errorLogin();
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div
      className="h-[90svh] flex items-center justify-center bg-gray-50"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:w-full sm:max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 capitalize">
          Hi Sadia, please sign in here :)
        </h2>

        <form onSubmit={handleSubmit} className="mt-6" method="post">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="user@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
              autoFocus="email"
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
          >
            Sign in
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-10 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
