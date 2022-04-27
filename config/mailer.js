const nodemailer = require("nodemailer");

const sendGmail = (email, name) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: 'disneyapi4@gmail.com', // generated ethereal user
      pass: "sccb yldg yxvs svfj", 
    },
  });

  const mailOptions = {
    from: `Disney API`,
    to: `${email}`,
    subject: `Bienvenida a Disney API`,
    text:  `${name} Bienvenido a Disney API, le deseamos que tenga la mejor de las experiencias.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(mailOptions);
    }
  });
};

module.exports = sendGmail;