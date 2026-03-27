import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp.jsx";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { Header } from "./components/Header.jsx";
export const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
       
      </Routes>
    </BrowserRouter>
  );
};
