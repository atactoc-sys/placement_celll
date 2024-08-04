const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");

router.get("/", interviewController.listInterviews);
router.get("/add", (req, res) => res.render("interviews/addInterview"));
router.post("/add", interviewController.addInterview);
router.post("/allocate", interviewController.allocateStudent);
router.post("/updateResult", interviewController.updateResult);
router.post("/markResult", interviewController.markResult);
router.get("/:id", interviewController.viewInterview);

module.exports = router;
