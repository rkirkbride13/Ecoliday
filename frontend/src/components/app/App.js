import React, { useState } from "react";
import TravelForm from "../travelForm/TravelForm";
import NavBar from "../navBar/navBar";
import EmissionResults from "../emissionResults/emissionResults";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUpForm from "../signUp/signUpForm";
import HomePage from "../homepage/homepage";

const App = () => {

  return (
      <Routes>
        <Route path="/" element={<HomePage navigate={ useNavigate()}/>} />
        <Route path="/signup" element={<SignUpForm navigate={ useNavigate()}/>} />
      </Routes>
  );
};

export default App;
