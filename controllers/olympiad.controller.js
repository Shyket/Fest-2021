const Participant = require("../models/Participant.model");

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

const paymentDone = (req, res) => {
  const id = req.params.id;

  Participant.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.due;
      participant.due = 0;
      participant.payment_status = true;
      participant
        .save()
        .then(() => {
          let error = "Payment completed succesfully";
          req.flash("error", error);
          res.redirect("/mo/participant-list");
        })
        .catch(() => {
          let error = "Transaction Failed";
          req.flash("error", error);
          res.redirect("/mo/participant-list");
        });
    })
    .catch(() => {
      let error = "Invalid Participant ID";
      req.flash("error", error);
      res.redirect("/mo/participant-list");
    });
};

const selectParticipant = (req, res) => {
  const id = req.params.id;

  Participant.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true;
      participant
        .save()
        .then(() => {
          let error = "Participant selected succesfully";
          req.flash("error", error);
          res.redirect("/mo/participant-list");
        })
        .catch(() => {
          let error = "Unexpected error occured";
          req.flash("error", error);
          res.redirect("/mo/participant-list");
        });
    })
    .catch(() => {
      let error = "Invalid participant ID";
      req.flash("error", error);
      res.redirect("/mo/participant-list");
    });
};

const getEditParticipant = (req, res) => {
  const id = req.params.id;
  let participant = [];
  let message = "";
  Participant.findOne({ _id: id })
    .then((data) => {
      participant = data;
      res.render("math-olympiad/edit-participant.ejs", {
        message: req.flash("message"),
        participant: participant,
      });
    })
    .catch((err) => {
      message = "Unexpected error occured";
      res.render("math-olympiad/edit-participant.ejs", {
        message: req.flash("message", message),
      });
    });
};

const postEditParticipant = async (req, res) => {
  const { name, contact, institute, category, email, tshirt } = req.body;

  Participant.findOneAndUpdate(
    { name: name, contact: contact },
    { category, email, institute, tshirt }
  )
    .then((data) => {
      let error = "Participant Data Updated Succesfully";
      req.flash("error", error);
      res.redirect("/mo/participant-list");
    })
    .catch((err) => {
      let error = "Unexpected error occured";
      req.flash("error", error);
      res.redirect("/mo/participant-list");
    });
};

module.exports = {
  getRegister,
  postRegister,
  getParticipantList,
  deleteParticipant,
  paymentDone,
  selectParticipant,
  getEditParticipant,
  postEditParticipant,
};
