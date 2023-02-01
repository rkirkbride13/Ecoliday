import React, { useState } from "react";
import TravelForm from "../travelForm/TravelForm";
import EmissionResults from "../emissionResults/EmissionResults";

const App = () => {
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("");
  const [emissions, setEmissions] = useState("");
  const [renderEmissions, setRenderEmissions] = useState(false);

  return (
    <div id="main-container" className="flex justify-center">
      <TravelForm
        distance={distance}
        setDistance={setDistance}
        passengers={passengers}
        setPassengers={setPassengers}
        setEmissions={setEmissions}
        setRenderEmissions={setRenderEmissions}
      />
      <EmissionResults emissions={emissions} renderEmissions={renderEmissions}/>
    </div>
  );
};

export default App;
