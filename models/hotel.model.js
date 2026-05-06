const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  adresse: {
    type: String,
    required: true,
    trim: true
  },
  ville: {
    type: String,
    required: true,
    trim: true
  },
  prix: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: "/imgs/image(7).png"
  }
},
 {
  timestamps: true
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;