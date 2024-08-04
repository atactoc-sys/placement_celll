const Student = require("../models/Student");
const Interview = require("../models/Interview");
const Result = require("../models/Result");
const createCsvWriter = require("csv-writer").createObjectCsvWriter; // Import csv-writer

exports.listStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.render("students/listStudents", { students });
  } catch (err) {
    console.error("Error listing students:", err);
    res.status(500).send("Error listing students");
  }
};

exports.addStudent = async (req, res) => {
  const { name, college, status, batch, dsa, webd, react } = req.body;

  // Correcting the status to match the enum values in the schema
  let correctedStatus = status;
  if (status.toLowerCase() === "not_placed") {
    correctedStatus = "Not_Placed";
  } else if (status.toLowerCase() === "placed") {
    correctedStatus = "Placed";
  }

  console.log("Request body:", req.body); // Log request body

  try {
    const student = new Student({
      name,
      college,
      status: correctedStatus,
      batch,
      scores: { dsa, webd, react },
    });
    await student.save();
    res.redirect("/students");
  } catch (err) {
    console.error("Error adding student:", err); // Log detailed error
    res.status(400).send("Error adding student");
  }
};

exports.exportCSV = async (req, res) => {
  try {
    // Fetch all interviews and populate student references
    const interviews = await Interview.find().populate({
      path: "students._id", // Populate student details
      model: "Student",
    });

    if (!interviews || interviews.length === 0) {
      return res.status(400).send("No data available to export");
    }

    // Prepare CSV writer
    const csvWriter = createCsvWriter({
      path: "students.csv",
      header: [
        { id: "studentId", title: "Student ID" },
        { id: "studentName", title: "Student Name" },
        { id: "college", title: "College" },
        { id: "status", title: "Status" },
        { id: "dsa", title: "DSA Final Score" },
        { id: "webd", title: "WebD Final Score" },
        { id: "react", title: "React Final Score" },
        { id: "interviewDate", title: "Interview Date" },
        { id: "company", title: "Interview Company" },
        { id: "result", title: "Result" },
      ],
    });

    // Prepare records for CSV
    const records = [];
    interviews.forEach((interview) => {
      if (interview.students && interview.students.length > 0) {
        interview.students.forEach((student) => {
          // Check if student is an ObjectId or an embedded object
          const studentObj = student._id ? student._id : student;

          records.push({
            studentId: studentObj._id,
            studentName: studentObj.name || "N/A",
            college: studentObj.college || "N/A",
            status: studentObj.status || "N/A",
            dsa: studentObj.scores ? studentObj.scores.dsa : "N/A",
            webd: studentObj.scores ? studentObj.scores.webd : "N/A",
            react: studentObj.scores ? studentObj.scores.react : "N/A",
            interviewDate: interview.date
              ? interview.date.toISOString().split("T")[0]
              : "N/A", // Format date as YYYY-MM-DD
            company: interview.company || "N/A",
            result: student.result || "N/A",
          });
        });
      }
    });

    if (records.length === 0) {
      return res.status(400).send("No data available to export");
    }

    // Write records to CSV
    await csvWriter.writeRecords(records);

    // Send the CSV file as a download
    res.download("students.csv", "students.csv", (err) => {
      if (err) {
        console.error("Error sending CSV file:", err);
        res.status(500).send("Error sending CSV file");
      }
    });
  } catch (err) {
    console.error("Error exporting CSV:", err);
    res.status(500).send("Error exporting CSV");
  }
};
