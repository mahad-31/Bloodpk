import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./input.css";

import Register from "./components/Register";
import Login from "./components/login";
import Profile from "./components/profile";
import User from "./components/user";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
