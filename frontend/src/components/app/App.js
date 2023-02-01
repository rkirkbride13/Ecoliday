import React, { useState } from "react";
import TravelForm from "../travelForm/TravelForm";
import NavBar from "../navBar/navBar";

function App() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <div id="main-container" className="flex justify-center">
        <TravelForm />
      </div>
    </>
  );
}

export default App;
