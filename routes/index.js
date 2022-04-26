const express = require("express");
const routes = express.Router();
const Media =  require('../models/media')

const auth = require("./auth");
const characters = require("./characters");

routes.use("/auth", auth);
routes.use("/characters", characters);
routes.post("/media", (req,res)=>{

Media.create({
title: req.body.title,
image: req.body.image,
dateCreate: req.body.dateCreate,
qualification: req.body.qualification,
associatedCharacters: req.body.associatedCharacters
})
.then((media)=>{
    res.json(media)
})
})

module.exports = routes;
