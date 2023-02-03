require("dotenv").config();

const locations = ["London uk", "Berlin Germany"];

// Promise.all(
//   locations.map((location) => {
//     return fetch(
//       `https://geocode.xyz?locate=${location}&json=1&auth=${process.env.GEOCODE_KEY}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         return { longt: data.longt, latt: data.latt };
//       });
//   })
// ).then((array) => console.log(array));

Promise.all(
  locations.map((location) => {
    return fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=${process.env.GEOAPIFY_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        return { longt: data.results[0].lon, latt: data.results[0].lat };
      });
  })
).then((array) => console.log(array));
