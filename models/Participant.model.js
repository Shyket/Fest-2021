const mongoose = require("mongoose");
const crypto = require("crypto");

const ParticipantSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  institute: {
    type: String,
  },
  t_shirt: {
    type: String,
  },
  selected: {
    type: Boolean,
  },
  payment_status: {
    type: Boolean,
  },
  paid: {
    type: Number,
  },
  due: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});



const Participant = mongoose.model("Participant", ParticipantSchema);
module.exports = Participant;
