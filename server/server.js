const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const cors = require("cors");

const express = require("express");
const connectDB = require("./src/config/db.js");
const cookieSession = require("cookie-session");

const authentication = require("./src/routes/auth.route.js");
const betaAccessRouter = require("./src/routes/beta-access.route.js");

const passport = require("passport");

connectDB();

const app = express();

var whitelist = [
  "http://localhost:4500",
  "http://localhost:3000",
  "http://localhost:4500/api/v1/auth/me",
  "http://localhost:4500/api/v1/auth/logout",
  "chrome-extension://onjmbpjhbgiojmhodfjlciihngghpmia/",
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("not allowed called");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cors({ origin: corsOptions, credentials: true }));

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 0.1 * 60 * 60 * 1000, // 10min
    keys: [process.env.COOKIE_KEY],
    secure: false,
    // sameSite: "none",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/auth", authentication);
app.use("/api/v1/beta-access", betaAccessRouter);

app.listen("4500", () => {
  console.log("server connected.");
});
