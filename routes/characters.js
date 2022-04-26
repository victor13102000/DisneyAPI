const express = require("express");
const characters = express.Router();

//verificador de token
const verifyToken = require("../middelware/verifyToken");

//controllers
const charactersControllers = require("../Controllers/CharactersControllers");

characters.post("/create", verifyToken, charactersControllers.CharacterCreate);
characters.delete("/delete", verifyToken, charactersControllers.CharacterDelete);
characters.put("/edit", verifyToken, charactersControllers.CharacterEdits);
characters.get("/", verifyToken, charactersControllers.characterList);
characters.get("/description/:id", verifyToken, charactersControllers.characterDescription);
characters.get("/characters?", verifyToken, charactersControllers.characterSearch);

module.exports = characters;
