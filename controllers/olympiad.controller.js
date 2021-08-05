const Participant = require("../models/Participant.model");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const getRegister = (req, res) => {
  res.render("math-olympiad/register.ejs", { message: req.flash("message") });
};

const getParticipantList = (req, res) => {
  let participantList = [];
  let error = "";
  Participant.find()
    .then((data) => {
      participantList = data;
      res.render("math-olympiad/participant-list.ejs", {
        error: req.flash("error"),
        participantList: participantList,
      });
    })
    .catch(() => {
      error = "Error!!";
      res.render("math-olympiad/participant-list.ejs", {
        error: req.flash("error", error),
        participantList: participantList,
      });
    });
};

const postRegister = (req, res) => {
  const { name, category, institute, contact, email, tshirt } = req.body;
  let due = 0;
  let payment_status = false;
  let paid = 0;
  let selected = false;
  if (category === "School") {
    due = 300;
  } else if (category === "College") {
    due = 450;
  } else {
    due = 600;
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
        paid,
        due,
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

const deleteParticipant = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Participant.deleteOne({ _id: id })
    .then(() => {
      let error = "Data deleted successfully";
      req.flash("error", error);
      res.redirect("/mo/participant-list");
    })
    .catch((err) => {
      let error = "Failed to delete data";
      req.flash("error", error);
      res.redirect("/mo/participant-list");
    });

};

module.exports = {
  getRegister,
  postRegister,
  getParticipantList,
  deleteParticipant,
};
