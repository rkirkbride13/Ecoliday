import React, { useEffect, useState } from "react";
import TravelForm from "../travelForm/TravelForm";
import EmissionResults from "../emissionResults/emissionResults";
import NavBar from "../navBar/navBar";

const HomePage = ({ navigate }) => {
  const [emissions, setEmissions] = useState("");
  const [renderEmissions, setRenderEmissions] = useState(false);
  const [toDisplay, setToDisplay] = useState("");
  const [fromDisplay, setFromDisplay] = useState("");

  // const [token, setToken] = useState(window.localStorage.getItem("token"));

  // useEffect(() => {
  //   if (token) {
  //     window.localStorage.removeItem("token");

  //   }
  // }, []);

  const renderFoundLocation = () => {
    if (renderEmissions)
      return (
        <div className="mb-10 text-center text-2xl">
          <div className="">
            <span className="text-green-500 font-bold text-xl mr-2">From:</span>
            <span className="text-gray-600">{fromDisplay}</span>
          </div>
          <div className="">
            <span className="text-green-500 font-bold text-xl mr-2">To:</span>
            <span className="text-gray-600">{toDisplay}</span>
          </div>
        </div>
      );
  };

  const logout = () => {
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <main id="main-container">
        <nav>
          <NavBar logout={logout} />
        </nav>
        <div className="h-28"></div>

        {renderFoundLocation()}
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

export default HomePage;
