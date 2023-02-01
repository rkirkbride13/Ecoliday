import React, { useState } from "react";
import TravelForm from "../travelForm/TravelForm";

const App = () => {
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("");
  const [emissions, setEmissions] = useState("");

  return (
    <div id="main-container" className="flex justify-center">
      <TravelForm
        distance={distance}
        setDistance={setDistance}
        passengers={passengers}
        setPassengers={setPassengers}
        emissions={emissions}
        setEmissions={setEmissions}
      />
    </div>
  );
};

export default App;
