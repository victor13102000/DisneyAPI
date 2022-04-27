const express = require("express");
const media = express.Router();

//verificador de token
const verifyToken = require("../middelware/verifyToken");

//controllers media
const controllersMedia=  require("../Controllers/MediaControllers")

media.post("/create", verifyToken, controllersMedia.mediaCreated );
media.delete("/delete", verifyToken,controllersMedia.mediaDelete );
media.put("/edit",verifyToken, controllersMedia.mediaEdits);
media.get("/",verifyToken, controllersMedia.listMovies);
media.get("/details/:id",verifyToken, controllersMedia.movieDetails);
media.get("/media?",verifyToken, controllersMedia.mediaSearch);

module.exports = media;