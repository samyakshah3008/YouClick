"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);

  const handleLogin = async () => {
    // window.location.href = "http://localhost:4500/api/v1/auth/google";
    window.location.href =
      "https://you-click-server.vercel.app/api/v1/auth/google";
  };

  const handleLogout = () => {
    // axios.get("http://localhost:4500/api/v1/auth/logout").then((response) => {
    //   setIsLoggedIn(false);
    //   setUser([]);
    // });
    axios
      .get("https://you-click-server.vercel.app/api/v1/auth/logout")
      .then((response) => {
        setIsLoggedIn(false);
        setUser([]);
      });
  };

  const fetchUser = async () => {
    try {
      // const res = await axios.get("http://localhost:4500/api/v1/auth/me", {
      //   withCredentials: true,
      // });
      const res = await axios.get(
        "https://you-click-server.vercel.app/api/v1/auth/me",
        {
          withCredentials: true,
        }
      );
      setUser(res?.data[0]);
      if (res?.data[0]?._id) {
        setIsLoggedIn(true);
      }
      console.log(res, "res");
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center container mx-auto">
          <div className="text-2xl font-bold">👍 YouClick</div>
          <a
            href="https://you-click.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className=" font-medium text-gray-700 hover:text-red-500 transition-colors"
          >
            How to use YouClick - Guide
          </a>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center mt-20">
        {isLoggedIn ? (
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h1 className="text-xl font-bold text-gray-800">
              Welcome back to YouClick!
            </h1>
            <p className="text-gray-600 mt-2">
              We're glad to have you logged in. Let's make the most of your
              time.
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h1 className="text-xl font-bold text-gray-800">
              Welcome to YouClick!
            </h1>
            <p className="text-gray-600 mt-2">
              Please log in to access your account and explore features.
            </p>
            <button
              onClick={handleLogin}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
            >
              Login
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
