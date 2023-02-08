import React, { useState } from "react";
import PropTypes from "prop-types";

const TravelForm = ({
  setEmissions,
  setRenderEmissions,
  setToDisplay,
  setFromDisplay,
  passengers,
  setPassengers,
  setSaveToggle,
}) => {
  TravelForm.propTypes = {
    setEmissions: PropTypes.func,
    setRenderEmissions: PropTypes.func,
    setToDisplay: PropTypes.func,
    setFromDisplay: PropTypes.func,
    passengers: PropTypes.string,
    setPassengers: PropTypes.func,
    setSaveToggle: PropTypes.func,
  };

  const places = [
    "Bamburgh Northumberland UK",
    "Llandudno Conwy (W) UK",
    "St Andrews Fife (S) UK",
    "Dartmouth Devon UK",
    "Tenby Pembrokeshire (W) UK",
    "St Davids Pembrokeshire (W) UK",
    "Aldeburgh Suffolk UK",
    "Filey North Yorkshire UK",
    "Conwy Conwy (W) UK",
    "Lyme Regis Dorset UK",
    "Lynmouth Devon UK",
    "Lytham St Annes Lancashire UK",
    "Robin Hood's Bay North Yorkshire UK",
    "Southwold Suffolk UK",
    "St Mawes Cornwall UK",
    "Lymington Hampshire UK",
    "Wells-next-the-sea Norfolk UK",
    "Whitby North Yorkshire UK",
    "Beaumaris Anglesey (W) UK",
    "North Berwick East Lothian (S) UK",
    "Sidmouth Devon UK",
    "Rye East Sussex UK",
    "Berwick-upon-Tweed Northumberland UK",
    "Blakeney Norfolk UK",
    "Bude Cornwall UK",
    "Saltburn-by-the-Sea North Yorkshire UK",
    "Deal Kent UK",
    "Fowey Cornwall UK",
    "Looe Cornwall UK",
    "Saundersfoot Pembrokeshire (W) UK",
    "Sheringham Norfolk UK",
    "Southsea Hampshire UK",
    "Swanage Dorset UK",
    "Broadstairs Kent UK",
    "Exmouth Devon UK",
    "Tynemouth Tyne and Wear UK",
    "Eastbourne East Sussex UK",
    "Folkestone Kent UK",
    "Mevagissey Cornwall UK",
    "Weymouth Dorset UK",
    "Ayr Ayrshire (S) UK",
    "Salcombe Devon UK",
    "Scarborough North Yorkshire UK",
    "Seahouses Northumberland UK",
    "Ventnor Isle of Wight UK",
    "Brixham Devon UK",
    "Falmouth Cornwall UK",
    "New Brighton Merseyside UK",
    "St Ives Cornwall UK",
    "Teignmouth Devon UK",
    "Whitley Bay Tyne and Wear UK",
    "Plymouth Devon UK",
    "Bournemouth Dorset UK",
    "Grange-over-Sands Cumbria UK",
    "Swansea Swansea (W) UK",
    "Whitstable Kent UK",
    "Brighton East Sussex UK",
    "Hastings East Sussex UK",
    "Huntstanton Norfolk UK",
    "Poole Dorset UK",
    "Dungeness Kent UK",
    "Ramsgate Kent UK",
    "Aberystwyth Ceredigion (W) UK",
    "Cromer Norfolk UK",
    "Morecambe Lancashire UK",
    "Oban Argyll and Bute (S) UK",
    "Padstow Cornwall UK",
    "Shanklin Isle of Wight UK",
    "Worthing West Sussex UK",
    "Dawlish Devon UK",
    "Penzance Cornwall UK",
    "Bridlington East Yorkshire UK",
    "Ilfracombe Devon UK",
    "Southport Merseyside UK",
    "Minehead Somerset UK",
    "Littlehampton West Sussex UK",
    "Torquay Devon UK",
    "Blackpool Lancashire UK”",
    "Weston-super-Mare Somerset UK",
    "Margate Kent UK",
    "Newquay Cornwall UK",
    "Herne Bay Kent UK",
    "Burnham-on-Sea Somerset UK",
    "Great Yarmouth Norfolk UK",
    "Southand-on-Sea Essex UK",
    "Bognor Regis West Sussex UK",
    "Skegness Lincolnshire UK",
  ];

  const [toForm, setToForm] = useState("");
  const [fromForm, setFromForm] = useState("");
  // const [passengers, setPassengers] = useState("");

  const handleChange = (setFunction) => {
    return (event) => {
      setFunction(event.target.value);
    };
  };

  const handleRandomPlace = (event) => {
    event.preventDefault();

    const random = () => {
      return Math.floor(Math.random() * places.length);
    };

    setToForm(places[random()]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(
      `/emissions?from=${fromForm}&to=${toForm}&passengers=${passengers}`
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setEmissions(responseData.emissions);
        setRenderEmissions(true);
        setToDisplay(responseData.to);
        setFromDisplay(responseData.from);
        setSaveToggle(false);
      });
  };

  return (
    <div id="travelForm" className="mt-8">
      <h1 className="text-3xl mb-10 font-medium">Plan your journey...</h1>
      <form onSubmit={handleSubmit}>
        <div id="from" className="mb-5 text-xl">
          <label for="from-input">From: </label>
          <br />
          <input
            id="from-input"
            data-cy="from"
            type="text"
            required
            value={fromForm}
            onChange={handleChange(setFromForm)}
            // pattern="\d*"
            className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 border-2 rounded peer"
          />
          <p className="invisible peer-focus:peer-invalid:visible text-xs pl-1 pt-1 text-red-500">
            Enter details
          </p>
        </div>

        <div id="to" className="mb-5 text-xl">
          <label for="to-input">To: </label>
          <br />
          <input
            id="to-input"
            data-cy="to"
            type="text"
            required
            value={toForm}
            onChange={handleChange(setToForm)}
            // pattern="\d*"
            className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 border-2 rounded peer"
          />
          <p className="invisible peer-focus:peer-invalid:visible text-xs pl-1 pt-1 text-red-500">
            Enter details
          </p>
        </div>

        <div id="passengers" className="mb-5 text-xl">
          <label for="passengers-input">Number of Passengers: </label>
          <br />
          <input
            id="passengers-input"
            data-cy="passengers"
            type="number"
            min="1"
            value={passengers}
            onChange={handleChange(setPassengers)}
            // pattern="\d*"
            className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 invalid:border-red-600 border-2 rounded peer"
          />
          <p className="invisible peer-invalid:visible text-xs pl-1 pt-1 text-red-500">
            Must be a positive whole number
          </p>
        </div>

        <input
          data-cy="travelFormSubmit"
          type="submit"
          value="Submit"
          className="btn bg-green-500 border-0 hover:bg-green-700 rounded-full"
        />
      </form>
      <div className="mt-2">Why not try the UK?</div>
      <form onSubmit={handleRandomPlace}>
        <input
          data-cy="randomPlace"
          type="submit"
          value="Get a suggestion"
          className="btn bg-green-500 border-0 hover:bg-green-700 rounded-full mt-2"
        />
      </form>
    </div>
  );
};

export default TravelForm;
