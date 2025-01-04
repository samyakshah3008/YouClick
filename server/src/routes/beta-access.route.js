const express = require("express");
const {
  submitBetaAccess,
  getSubmissionStatus,
} = require("../controllers/beta-access.controller");

const router = express.Router();

router.post("/submit", submitBetaAccess);
router.get("/status", getSubmissionStatus);

module.exports = router;
