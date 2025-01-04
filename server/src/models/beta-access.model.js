const mongoose = require("mongoose");

const betaAccessSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /\S+@\S+\.\S+/.test(v),
        message: "Invalid email format",
      },
    },
    useCase: {
      type: String,
      required: true,
    },
    favoriteYoutuber: {
      type: String,
      required: true,
    },
    starredRepo: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BetaAccess", betaAccessSchema);
