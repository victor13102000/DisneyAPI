const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  //Login
  singIn(req, res) {
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
            let token = jwt.sign({ user: user }, "secret", {
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
  },
  //Registro
  singUp(req, res) {
    try {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
        .then((user) => {
          res.status(201).json({
            user: user,
          });
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      res.status(404).json(error);
    }
  },
};
