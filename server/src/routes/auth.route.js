const express = require("express");
const passport = require("passport");
const router = express.Router();

require("../services/passport.js");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/youtube.force-ssl",
    ],
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/failure",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/youtube.force-ssl",
    ],
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/failure",
  })
);

router.get("/me", (req, res) => {
  console.log(req.user, "user");
  // console.log(req?.session, "Sessions");
  // console.log(req?.sessionID, "session ID");
  // console.log(req?.sessionStore, "store of session");
  res.json(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("success logout");
});

router.get("/hello", (req, res) => {
  console.log("here called");
  res.json("Hello world");
});

module.exports = router;
