const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// app.use(require("./routes/record"));
// get driver connection
// const dbo = require("./db/conn");

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });

const Temp = require("./models/test");

app.post("/temp", async (req, res) => {
  await Temp.create({ message: req.body.message });
  res.status(200).json({ message: "OK" });
});

app.get("/temp", async (req, res) => {
  const messages = await Temp.find({});
  res.status(200).json({ messages: messages });
});

module.exports = app;
