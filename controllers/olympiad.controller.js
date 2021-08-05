const Participant = require("../models/Participant.model");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const getRegister = (req, res) => {
  res.render("math-olympiad/register.ejs", { message: req.flash("message") });
};

const getParticipantList = (req, res) => {
  res.render("math-olympiad/participant-list.ejs", {
    error: req.flash("error"),
  });
};

const postRegister = (req, res) => {
  const { name, category, institute, contact, email, tshirt } = req.body;
  let fee = 0;
  let payment_status = false;
  let selected = false;
  if (category === "School") {
    fee = 300;
  } else if (category === "College") {
    fee = 450;
  } else {
    fee = 600;
  }

  console.log(name);
  console.log(category);
  console.log(institute);
  console.log(contact);
  console.log(email);
  console.log(tshirt);

  let message = "";

  Participant.findOne({ name: name, contact: contact }).then((participant) => {
    if (participant) {
      message = "participant already registered!";
      console.log(message);
      req.flash("message", message);
      res.redirect("/mo/register");
    } else {
      const participant = new Participant({
        name,
        category,
        contact,
        email,
        institute,
        payment_status,
        fee,
        selected,
        t_shirt: tshirt,
      });
      participant
        .save()
        .then(() => {
          message = "participant registered successfully";
          console.log(message);
          req.flash("message", message);
          res.redirect("/mo/register");
        })
        .catch(() => {
          message = "upexpected error occured! participant registration failed";
          console.log(message);
          req.flash("message", message);
          res.redirect("/mo/register");
        });
    }
  });
};

module.exports = {
  getRegister,
  postRegister,
  getParticipantList,
};
