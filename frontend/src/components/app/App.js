import React, { useState } from "react";
import TravelForm from "../travelForm/TravelForm";
import EmissionResults from "../emissionResults/emissionResults";

const App = () => {
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("");
  const [emissions, setEmissions] = useState("");
  const [renderEmissions, setRenderEmissions] = useState(false);

  return (
    <div id="main-container" className="flex justify-center align-middle">
      <TravelForm
        distance={distance}
        setDistance={setDistance}
        passengers={passengers}
        setPassengers={setPassengers}
        setEmissions={setEmissions}
        setRenderEmissions={setRenderEmissions}
      />
      <div className="w-24"></div>
      <EmissionResults
        emissions={emissions}
        renderEmissions={renderEmissions}
      />
    </div>
  );
};

export default App;
