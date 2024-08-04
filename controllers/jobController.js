const axios = require("axios");

exports.listJobs = async (req, res) => {
  try {
    const anotherJobsResponse = await axios.get(
      "https://www.arbeitnow.com/api/job-board-api"
    );
    console.log("API Response:", anotherJobsResponse.data);

    const anotherJobs = anotherJobsResponse.data.data || [];

    res.render("jobs/listJobs", { jobs: anotherJobs });
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(400).send("Error fetching jobs");
  }
};
