const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.listStudents);
router.get("/add", (req, res) => res.render("students/addStudent"));
router.post("/add", studentController.addStudent);
router.get("/export", studentController.exportCSV);

module.exports = router;
