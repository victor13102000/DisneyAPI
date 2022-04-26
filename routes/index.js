const express = require("express");
const routes = express.Router();


const auth = require("./auth");
const characters = require("./characters");
const media = require("./media");

routes.use("/auth", auth);
routes.use("/characters", characters);
routes.use("/movies", media)

module.exports = routes;
