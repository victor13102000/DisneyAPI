const express = require("express");
const routes = express.Router();

const auth = require("./auth");
const characters = require("./characters");

routes.use("/auth", auth);
routes.use("/characters", characters);

module.exports = routes;
