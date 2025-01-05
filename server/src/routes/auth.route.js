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
    // successRedirect: "http://localhost:3000",
    // failureRedirect: "http://localhost:3000",
    successRedirect: "https://you-click-dashboard.vercel.app",
    failureRedirect: "https://you-click-dashboard.vercel.app",
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
    // successRedirect: "http://localhost:3000",
    // failureRedirect: "http://localhost:3000",
    successRedirect: "https://you-click-dashboard.vercel.app",
    failureRedirect: "https://you-click-dashboard.vercel.app",
  })
);

router.get("/me", (req, res) => {
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
