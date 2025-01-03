import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleLogin = () => {
    chrome.tabs.create({
      url: "http://localhost:4500/api/v1/auth/google",
      selected: true,
      active: true,
    });
  };

  const handleLogout = () => {
    axios.get("http://localhost:4500/api/v1/auth/logout").then((response) => {
      console.log(response, "resss");
      chrome.storage.local.remove("accessToken", () => {
        console.log("Access token removed from storage.");
      });
      setAccessToken(null); // Clear the access token state
      setUser([]); // Clear user state
      window.location.reload();
    });
  };

  useEffect(() => {
    // chrome.storage.local.get("accessToken", (data) => {
    //   if (data.accessToken) {
    //     console.log("Access token retrieved from storage:", data.accessToken);
    //     setAccessToken(data.accessToken);
    //   } else {
    //     console.log("No access token found in storage.");
    //   }
    // });

    chrome.storage.local.remove("accessToken", () => {
      console.log("Access token removed from storage.");
    });
    axios
      .get("http://localhost:4500/api/v1/auth/me", {
        withCredentials: true, // Make sure cookies are sent
      })
      .then((res) => {
        console.log(res, "rejsss");

        chrome.storage.local.get("accessToken", (data) => {
          if (!data.accessToken) {
            chrome.storage.local.set(
              { accessToken: res.data[0]?.accessToken },
              () => {
                console.log("Access token saved to Chrome storage.");
                setAccessToken(res.data[0]?.accessToken);
              }
            );
          } else {
            console.log("token already present");
          }
        });

        setUser(res.data);
      });
  }, []);

  console.log(user, "user");

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center py-44">
        {user?.length ? (
          <button
            onClick={handleLogout}
            className="py-4 px-3 bg-red-500 text-white m-2"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="py-4 px-3 bg-red-500 text-white m-2"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
