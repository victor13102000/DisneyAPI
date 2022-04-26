const express = require("express");
const auth = express.Router();

//controllers 
const authControllers = require('../Controllers/AuthControllers')

auth.post('/login', authControllers.singIn);
auth.post('/register', authControllers.singUp);


module.exports= auth