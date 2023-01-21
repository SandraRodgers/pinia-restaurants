const envConfig = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const fetch = require("node-fetch");

const favorites = require("./db/favorites.json");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/favorites", (req, res) => {
  res.json({
    favorites: favorites,
  });
});

app.post("/favorites", (req, res) => {
  const favorites = JSON.parse(fs.readFileSync("./db/favorites.json"));
  if (req.body) {
    favorites.push(req.body);
    fs.writeFileSync("./db/favorites.json", JSON.stringify(favorites, null, 4));
    res.send(req.body);
  } else {
    res.sendStatus(400);
  }
});

// Authentication Endpoints

app.post("/register", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./db/user.json"));
  const user = users.find(
    (x) =>
      x.name === req.body.createdName &&
      x.username === req.body.createdUserName &&
      x.password === req.body.createdPassword
  );
  if (user) {
    res.send({ message: "User already exists. Please sign in." });
  } else if (req.body) {
    const createdUser = {
      name: req.body.createdName,
      username: req.body.createdUserName,
      password: req.body.createdPassword,
    };
    const users = JSON.parse(fs.readFileSync("./db/user.json"));
    users.push(createdUser);
    fs.writeFileSync("./db/user.json", JSON.stringify(users, null, 4));
    res.send(createdUser);
  } else {
    res.sendStatus(400);
  }
});

app.post("/login", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./db/user.json"));
  const user = users.find(
    (x) => x.username === req.body.username && x.password === req.body.password
  );
  if (user) {
    res.send({
      user,
    });
  } else {
    res.sendStatus(400);
  }
});

// Google Maps Endpoints

app.post("/geolocation", (req, res) => {
  const location = fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.latitude},${req.body.longitude}&sensor=true&key=${process.env.GOOGLE_MAPS_API}`
  )
    .then((res) => res.json())
    .then((json) => res.send(json));
});

app.post("/lat-long", (req, res) => {
  const latLong = fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.location}&key=${process.env.GOOGLE_MAPS_API}`
  )
    .then((res) => res.json())
    .then((json) => res.send(json));
});

app.post("/find-restaurant", (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.search}&location=${req.body.lat},${req.body.long}&radius=16000&key=${process.env.GOOGLE_MAPS_API}`;
  const place = fetch(url)
    .then((res) => res.json())
    .then((json) => res.send(json));
});

app.post("/restaurant-details", (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cformatted_address%2Cformatted_phone_number%2Cplace_id%2Crating%2Creview&key=${process.env.GOOGLE_MAPS_API}&placeid=${req.body.place_id}`;
  const place = fetch(url)
    .then((res) => res.json())
    .then((json) => res.send(json));
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
