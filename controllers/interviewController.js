const Interview = require("../models/Interview");
const Student = require("../models/Student");

exports.listInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().populate("students");
    const students = await Student.find();
    res.render("interviews/listInterviews", { interviews, students });
  } catch (err) {
    res.status(400).send("Error listing interviews");
  }
};

exports.addInterview = async (req, res) => {
  try {
    const interview = new Interview(req.body);
    await interview.save();
    res.redirect("/interviews");
  } catch (err) {
    res.status(400).send("Error adding interview");
  }
};

exports.updateResult = async (req, res) => {
  const { interviewId, studentId, result } = req.body;

  try {
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).send("Interview not found");
    }

    const student = interview.students.id(studentId);

    if (!student) {
      return res.status(404).send("Student not found in interview");
    }

    student.result = result;
    await interview.save();

    res.redirect(`/interviews/${interviewId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.allocateStudent = async (req, res) => {
  const { interviewId, studentId } = req.body;

  try {
    const interview = await Interview.findById(interviewId);
    const student = await Student.findById(studentId);

    if (interview && student) {
      interview.students.push({
        _id: student._id,
        name: student.name,
        result: "On Hold",
      });
      await interview.save();
    }

    res.redirect(`/interviews/${interviewId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.markResult = async (req, res) => {
  try {
    const interview = await Interview.findById(req.body.interviewId);
    const student = interview.students.id(req.body.studentId);
    student.result = req.body.result;
    await interview.save();
    res.redirect(`/interviews/${req.body.interviewId}`);
  } catch (err) {
    res.status(400).send("Error marking result");
  }
};

exports.viewInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate(
      "students"
    );
    const students = await Student.find();
    res.render("interviews/viewInterview", { interview, students });
  } catch (err) {
    res.status(400).send("Error viewing interview");
  }
};
