import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // chrome.tabs.create({
    //   url: "http://localhost:4500/api/v1/auth/google",
    //   selected: true,
    //   active: true,
    // });
    chrome.tabs.create({
      url: "https://you-click-server.vercel.app/api/v1/auth/google",
      selected: true,
      active: true,
    });
  };

  const handleLogout = () => {
    // axios.get("http://localhost:4500/api/v1/auth/logout").then((response) => {
    //   chrome.storage.local.remove("accessToken", () => {
    //     console.log("Access token removed from storage.");
    //   });
    //   window.location.reload();
    // });
    axios
      .get("https://you-click-server.vercel.app/api/v1/auth/logout")
      .then((response) => {
        chrome.storage.local.remove("accessToken", () => {
          console.log("Access token removed from storage.");
        });
        window.location.reload();
      });
  };

  useEffect(() => {
    chrome.storage.local.remove("accessToken", () => {
      console.log("Access token removed from storage.");
    });
    axios
      // .get("http://localhost:4500/api/v1/auth/me", {
      //   withCredentials: true,
      // })
      .get("https://you-click-server.vercel.app/api/v1/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data[0]?.accessToken) {
          setIsLoggedIn(true);
        }
        chrome.storage.local.get("accessToken", (data) => {
          if (!data.accessToken) {
            chrome.storage.local.set(
              { accessToken: res.data[0]?.accessToken },
              () => {
                console.log("Access token saved to Chrome storage.");
              }
            );
          } else {
            console.log("token already present");
          }
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 w-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center container mx-auto">
          <div className="text-2xl font-bold">👍 YouClick</div>
          <a
            href="https://you-click.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className=" font-medium text-gray-700 hover:text-red-500 transition-colors"
          >
            How to use YouClick - Guide
          </a>
        </div>
      </nav>

      {/* Main Content */}
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
}

export default Home;
