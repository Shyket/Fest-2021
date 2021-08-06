const Team = require("../models/Team.model");

const getRegister = (req, res) => {
  res.render("programming-contest/register.ejs", { error: req.flash("error") });
};

const postRegister = (req, res) => {
  const {
    teamName,
    institute,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    leaderName,
    leaderContact,
    leaderEmail,
    leaderTshirt,
    member1Name,
    member1Contact,
    member1Email,
    member1Tshirt,
    member2Name,
    member2Contact,
    member2Email,
    member2Tshirt,
  } = req.body;

  const due = 800;
  const paid = 0;
  const selected = false;
  let error = "";

  Team.findOne({ teamName: teamName, institute: institute }).then(
    (team) => {
      if (team) {
        error = "Team with same name and institution exists";
        req.flash("error", error);
        res.redirect("/pc/register");
      } else {
        const team = new Team({
          teamName,
          institute,
          coachName,
          coachContact,
          coachEmail,
          coachTshirt,
          leaderName,
          leaderContact,
          leaderEmail,
          leaderTshirt,
          member1Name,
          member1Contact,
          member1Email,
          member1Tshirt,
          member2Name,
          member2Contact,
          member2Email,
          member2Tshirt,
          due,
          paid,
          selected,
        });
        team
          .save()
          .then(() => {
            error =
              "Team registered successfully";
            req.flash("error", error);
            res.redirect("/pc/register");
          })
          .catch((err) => {
            error = "Unexpected error";
            console.log("error ", err);
            req.flash("error", error);
            res.redirect("/pc/register");
          });
      }
    }
  );
};

const getTeamList = (req, res) => {
  let teamList = [];
  let error = "";
  Team.find()
    .then((data) => {
      teamList = data;
      res.render("programming-contest/team-list.ejs", {
        error: req.flash("error"),
        teamList: teamList,
      });
    })
    .catch(() => {
      error = "Failed to fetch participants";
      res.render("programming-contest/team-list.ejs", {
        error: req.flash("error", error),
        teamList: teamList,
      });
    });
};


const deleteTeam = (req, res) => {
  const id = req.params.id;

  let error = "";
  Team.deleteOne({ _id: id })
    .then(() => {
      error = "Delete Successful";
      req.flash("error", error);
      res.redirect("/pc/team-list");
    })
    .catch(() => {
      error = "Error Occured";
      req.flash("error", error);
      res.redirect("/pc/team-list");
    });
};

const paymentDone = (req, res) => {
  const id = req.params.id;

  Team.findOne({ _id: id })
    .then((team) => {
      team.paid = team.due;
      team.due = 0;
      team
        .save()
        .then(() => {
          let error = "Payment successfull";
          req.flash("error", error);
          res.redirect("/pc/team-list");
        })
        .catch(() => {
          let error = "Error occured";
          req.flash("error", error);
          res.redirect("/pc/team-list");
        });
    })
    .catch(() => {
      let error = "Invalid ID";
      req.flash("error", error);
      res.redirect("/pc/team-list");
    });
};

const getEditTeam = (req, res) => {
  const id = req.params.id;
  let team = [];
  Team.findOne({ _id: id })
    .then((data) => {
      team = data;

      res.render("programming-contest/edit-team.ejs", {
        error: req.flash("error"),
        team: team,
      });
    })
    .catch((e) => {
      console.log(e);
      error = "Error Occured";
      res.render("programming-contest/editTeam.ejs", {
        error: req.flash("error", error),
        team: info,
      });
    });
};

const postEditTeam = async (req, res) => {
  const {
    teamName,
    institute,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    leaderName,
    leaderContact,
    leaderEmail,
    leadertshirt,
    member1Name,
    member1Contact,
    member1Email,
    member1tshirt,
    member2Name,
    member2Contact,
    member2Email,
    member2tshirt,
  } = req.body;


  Team.findOneAndUpdate(
    { teamName: teamName, institute: institute },
    {
      coachName,
      coachContact,
      coachEmail,
      coachTshirt,
      leaderName,
      leaderContact,
      leaderEmail,
      leadertshirt,
      member1Name,
      member1Contact,
      member1Email,
      member1tshirt,
      member2Name,
      member2Contact,
      member2Email,
      member2tshirt,
    }
  ).then(data=> {
      let error = "Team Data Updated Succesfully";
      req.flash("error", error);
      res.redirect("/pc/team-list");
  }).catch(err => {
      let error = "Unexpected error occured";
      req.flash("error", error);
      res.redirect("/pc/team-list");
  })
};

const selectTeam = (req, res) => {
  const id = req.params.id;

  Team.findOne({ _id: id })
    .then((team) => {
      team.selected = true;
      team
        .save()
        .then(() => {
          let error = "Team Selected";
          req.flash("error", error);
          res.redirect("/pc/team-list");
        })
        .catch(() => {
          let error = "Error Occured";
          req.flash("error", error);
          res.redirect("/pc/team-list");
        });
    })
    .catch(() => {
      let error = "Invalid ID";
      req.flash("error", error);
      res.redirect("/ProgContest/list");
    });
};

module.exports = {
  getRegister,
  postRegister,
  getTeamList,
  deleteTeam,
  paymentDone,
  selectTeam,
  getEditTeam,
  postEditTeam,
};
