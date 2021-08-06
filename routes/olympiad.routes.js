const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  addUserData,
} = require("./../middlewares/auth.middleware");

const {
  getRegister,
  postRegister,
  getParticipantList,
  deleteParticipant,
  paymentDone,
  selectParticipant,
  getEditParticipant,
  postEditParticipant,
} = require("../controllers/olympiad.controller");

router.get("/register", ensureAuthenticated, addUserData, getRegister);
router.post("/register", ensureAuthenticated, postRegister);
router.get("/participant-list", ensureAuthenticated, addUserData, getParticipantList);
router.get("/delete/:id", ensureAuthenticated, addUserData, deleteParticipant);
router.get("/payment/:id", ensureAuthenticated, addUserData, paymentDone);
router.get("/select/:id", ensureAuthenticated, addUserData, selectParticipant);
router.get("/edit/:id", ensureAuthenticated, addUserData, getEditParticipant);
router.post("/edit/", ensureAuthenticated, addUserData, postEditParticipant);






module.exports = router;
