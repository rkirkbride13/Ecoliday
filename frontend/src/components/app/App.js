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
      <main id="main-container">
        <nav>
          <NavBar />
        </nav>
        <div className="h-28"></div>

        {/* <div className="flex flex-col w-fit mb-10 justify-center mx-auto">
          <div className="">
            <span>From:</span>
            <span>{fromDisplay}</span>
          </div>
          <div className="">
            <span>To:</span>
            <span>{toDisplay}</span>
          </div>
        </div> */}
        <div className="mb-10 text-center text-2xl">
          <div className="">
            <span className="text-green-500 font-bold text-xl mr-2">From:</span>
            <span className="text-gray-600">{fromDisplay}</span>
          </div>
          <div className="">
            <span className="text-green-500 font-bold text-xl mr-2">To:</span>
            <span className="text-gray-600">{toDisplay}</span>
          </div>
          {/* <h1 className="">From: {fromDisplay}</h1>
          <h1 className="">To: {toDisplay}</h1> */}
        </div>
        <div className="flex justify-center">
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
            fromDisplay={fromDisplay}
            toDisplay={toDisplay}
          />
        </div>
      </main>
    </>
  );
};

export default App;
