import React, { useState } from "react";
import TravelForm from "../travelForm/TravelForm";
import NavBar from "../navBar/navBar";
import EmissionResults from "../emissionResults/emissionResults";

const App = () => {
  const [emissions, setEmissions] = useState("");
  const [renderEmissions, setRenderEmissions] = useState(false);
  const [toDisplay, setToDisplay] = useState("");
  const [fromDisplay, setFromDisplay] = useState("");

  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <div id="main-container" className="flex justify-center mt-32">
        <TravelForm
          setEmissions={setEmissions}
          setRenderEmissions={setRenderEmissions}
          setToDisplay={setToDisplay}
          setFromDisplay={setFromDisplay}
        />
        <div className="w-40"></div>
        <EmissionResults
          emissions={emissions}
          renderEmissions={renderEmissions}
        />
      </div>
    </>
  );
};

export default App;
