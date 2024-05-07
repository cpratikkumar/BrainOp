import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignupScreen from "./screens/SignupScreen";
import PostlistScreen from "./screens/PostlistScreen";

import Cookies from "js-cookie";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const myCookieValue = Cookies.get("jwt");
    if (myCookieValue) {
      navigate("/postlist");
    } else {
      navigate("/signup");
    }
  }, []);
  return (
    <div className=" w-[100%] h-[100%]">
      <Routes>
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/postlist" element={<PostlistScreen />} />
      </Routes>
    </div>
  );
}

export default App;
