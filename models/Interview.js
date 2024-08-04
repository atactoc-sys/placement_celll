const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  name: String,
  result: {
    type: String,
    enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
    default: "On Hold",
  },
});

const interviewSchema = new mongoose.Schema({
  company: String,
  date: Date,
  students: [studentSchema],
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
