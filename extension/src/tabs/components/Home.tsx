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
      <main className="flex flex-col justify-center items-center mt-20 gap-8">
        <div className="bg-white p-6 shadow-md rounded-lg text-center w-1/2">
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg w-1/2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Important Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Open a new tab to start a session after successful login.</li>
            <li>
              Session will stay active only for 1 hour; you need to re-login
              afterward.
            </li>
            <li>
              Ensure you use same YouTube Account which you login from YouClick.
              Or else from that account which you will login - in that all
              actions will be executed.
            </li>
            <li>
              Ensure you grant YouTube's permissions during login, or it won't
              work.
            </li>
            <li>
              If you don't have beta access, you won't be able to log in since
              YouClick is currently under test mode and we are working on
              Publishing to Chrome Web Store. To get access, please fill out a{" "}
              <a
                href="https://you-click.vercel.app/beta-access"
                target="_blank"
                className="text-blue-500"
              >
                short form
              </a>{" "}
              today.
            </li>
            <li>
              Read FAQs{" "}
              <a
                href="https://you-click.vercel.app/"
                target="_blank"
                className="text-blue-500"
              >
                here
              </a>
              .
            </li>
            <li>
              If you liked YouClick, please consider hitting a star on Github{" "}
              <a
                href="https://github.com/samyakshah3008/YouClick"
                target="_blank"
                className="text-blue-500"
              >
                here
              </a>
              .
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Home;
