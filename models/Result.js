const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
    required: true,
  },
  result: {
    type: String,
    enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
    required: true,
  },
});

module.exports = mongoose.model("Result", ResultSchema);
