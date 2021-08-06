const express = require("express");
const router = express.Router();

const {
  ensureAuthenticated,
  addUserData,
} = require("../middlewares/auth.middleware");

const {
  getRegister,
  postRegister,
  getTeamList,
  deleteTeam,
  paymentDone,
  selectTeam,
  getEditTeam,
  postEditTeam,
} = require("../controllers/ProgrammingContest.controller");

router.get("/register", ensureAuthenticated, addUserData, getRegister);
router.post("/register", ensureAuthenticated, addUserData, postRegister);
router.get("/team-list", ensureAuthenticated, addUserData, getTeamList);
router.get("/delete/:id", ensureAuthenticated, addUserData, deleteTeam);
router.get("/payment/:id", ensureAuthenticated, addUserData, paymentDone);
router.get("/select/:id", ensureAuthenticated, addUserData, selectTeam);
router.get("/edit/:id", ensureAuthenticated, addUserData, getEditTeam);
router.post("/edit", ensureAuthenticated, addUserData, postEditTeam);

module.exports = router;
