const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendGmail = require("../config/mailer")


  //Login
 const  singIn = (req, res) => {
    try {
      const { email, password } = req.body;
      User.findOne({
        where: {
          email: email,
        },
      }).then((user) => {
        if (!user) {
          res.status(401).json({ msg: "email not found in database" });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ email: user.email }, "secret", {
              expiresIn: "7d",
            });

            res.status(200).json({
              token: token,
              user: user,
            });
          } else {
            res.status(401).json({ msg: "Incorrect password" });
          }
        }
      });
    } catch (error) {
      res.status(404).json(error);
    }
  }
  //Registro
  const singUp= async (req, res) =>{
     try { 
     const newUser= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      if(!newUser) res.status(500).json({msg: 'error'})
      
     const email= await sendGmail(req.body.email, req.body.name)
         res.status(201).json({
            user: newUser,
        })
       
     } catch (error) {
      res.status(404).json(error);
    } 
  }

module.exports = {singIn, singUp}