const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    adresse: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    telephone: {
      type: String,
      trim: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    devise: {
      type: String,
      default: "FCFA",
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hotel", hotelSchema);