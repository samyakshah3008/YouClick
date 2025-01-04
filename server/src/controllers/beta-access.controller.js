const BetaAccess = require("../models/beta-access.model");

const submitBetaAccess = async (req, res) => {
  try {
    const { email, useCase, favoriteYoutuber, starredRepo } = req.body;

    const existingSubmission = await BetaAccess.findOne({ email });
    if (existingSubmission) {
      return res
        .status(400)
        .json({ message: "You have already submitted the form." });
    }

    const newSubmission = new BetaAccess({
      email,
      useCase,
      favoriteYoutuber,
      starredRepo,
    });
    await newSubmission.save();

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const getSubmissionStatus = async (req, res) => {
  try {
    const { email } = req.query;

    const submission = await BetaAccess.findOne({ email });
    if (!submission) {
      return res
        .status(404)
        .json({ message: "No submission found for this email." });
    }

    res.status(200).json({ status: submission.status });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

module.exports = {
  submitBetaAccess,
  getSubmissionStatus,
};
