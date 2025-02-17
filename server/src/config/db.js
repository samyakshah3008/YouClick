const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.mongoDBURI);
    console.log("db connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
