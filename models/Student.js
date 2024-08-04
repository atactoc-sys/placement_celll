const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  status: { type: String, enum: ["Placed", "Not_Placed"], required: true },
  batch: { type: String, required: true },
  scores: {
    dsa: { type: Number, required: true },
    webd: { type: Number, required: true },
    react: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Student", StudentSchema);
