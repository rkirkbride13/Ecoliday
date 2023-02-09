import React, { useState, useReducer } from "react";
import TravelForm from "../travelForm/TravelForm";
import EmissionResults from "../emissionResults/emissionResults";
import NavBar from "../navBar/navBar";

const HomePage = ({ navigate }) => {
  const [emissions, setEmissions] = useState("");
  const [renderEmissions, setRenderEmissions] = useState(false);
  const [toDisplay, setToDisplay] = useState("");
  const [fromDisplay, setFromDisplay] = useState("");
  const [passengers, setPassengers] = useState("");
  const [saveToggle, setSaveToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const hasToken = Boolean(window.localStorage.getItem("token"));

  // const renderFoundLocation = () => {
  //   if (renderEmissions)
  //     return (
  //       <div className="mb-10 text-center text-2xl">
  //         <div className="">
  //           <span className="text-green-500 font-bold text-xl mr-2">From:</span>
  //           <span className="text-gray-600">{fromDisplay}</span>
  //         </div>
  //         <div className="">
  //           <span className="text-green-500 font-bold text-xl mr-2">To:</span>
  //           <span className="text-gray-600">{toDisplay}</span>
  //         </div>
  //       </div>
  //     );
  // };

  const navbarLinks = () => {
    if (!hasToken) {
      return [{ href: "/login", text: "Login", handleClick: () => {} }];
    } else {
      return [
        {
          href: "/trips",
          text: "Trips",
          handleClick: () => {},
        },
        {
          href: "/",
          text: "Logout",
          handleClick: (e) => {
            e.preventDefault();
            window.localStorage.removeItem("token");
            forceUpdate();
          },
        },
      ];
    }
  };

  return (
    <>
      <main id="main-container">
        <nav>
          <NavBar links={navbarLinks()} />
        </nav>
        <div className="h-20"></div>

        {/* {renderFoundLocation()} */}
        <div className="flex justify-center">
          <TravelForm
            setEmissions={setEmissions}
            setRenderEmissions={setRenderEmissions}
            setToDisplay={setToDisplay}
            setFromDisplay={setFromDisplay}
            passengers={passengers}
            setPassengers={setPassengers}
            setSaveToggle={setSaveToggle}
            setLoading={setLoading}
          />
          
          <EmissionResults
            emissions={emissions}
            renderEmissions={renderEmissions}
            fromDisplay={fromDisplay}
            toDisplay={toDisplay}
            passengers={passengers}
            setSaveToggle={setSaveToggle}
            saveToggle={saveToggle}
            loading={loading}
          />
        </div>
      </main>
    </>
  );
};

export default HomePage;
