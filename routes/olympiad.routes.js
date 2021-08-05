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
} = require("../controllers/olympiad.controller");

router.get("/register", ensureAuthenticated, addUserData, getRegister);
router.post("/register", ensureAuthenticated, postRegister);
router.get("/participant-list", ensureAuthenticated, addUserData, getParticipantList);
router.get("/delete/:id", ensureAuthenticated, addUserData, deleteParticipant);





module.exports = router;
