const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const User = require("../models/user.model");

const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  console.log(id, "id");
  try {
    const user = await User.find({ _id: id });
    // console.log(user, "user found in deserialize");
    done("", user);
  } catch (error) {
    console.log(error, "error");
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.client_id_final,
      clientSecret: process.env.client_secret_final,
      callbackURL: "/api/v1/auth/google/callback",
      scope: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube.force-ssl",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("passport entry");
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // Update existing user details
          existingUser.accessToken = accessToken;
          existingUser.refreshToken = refreshToken;
          existingUser.name = profile.displayName;
          existingUser.avatarUrl = profile.photos[0].value;
          existingUser.isVerified = profile.emails[0].verified;

          await existingUser.save();
          return done(null, existingUser);
        }

        // Create a new user
        const newUser = new User({
          accessToken,
          refreshToken,
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatarUrl: profile.photos[0].value,
          isVerified: profile.emails[0].verified,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.log(error, "error from passport");
        return done(error, null);
      }
    }
  )
);
