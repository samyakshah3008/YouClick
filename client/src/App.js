import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const loginWithGoogle = async () => {
    window.location.href = "http://localhost:4500/api/v1/auth/google";
  };

  const handleLogout = () => {
    axios.get("http://localhost:4500/api/v1/auth/logout").then((response) => {
      console.log(response, "resss");
      setUser([]);
      // window.location.reload();
    });
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4500/api/v1/auth/me", {
        withCredentials: true,
      });
      setUser(res?.data[0]);
      console.log(res, "res");
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    // axios
    //   .get("http://localhost:4500/api/v1/auth/me", {
    //     withCredentials: true, // Make sure cookies are sent
    //   })
    //   .then((res) => {
    //     console.log(res, "rejsss");
    //     setUser(res.data);
    //   });
    fetchUser();
  }, []);

  return (
    // <div className="App">
    //   hello
    //   <button onClick={loginWithGoogle}>Login with Google</button>
    // </div>

    <div className="h-screen">
      <div className="flex justify-center items-center py-44">
        {user?._id ? (
          <button
            onClick={handleLogout}
            className="py-4 px-3 bg-red-500 text-white m-2"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="py-4 px-3 bg-red-500 text-white m-2"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
