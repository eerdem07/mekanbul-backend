const mongoose = require("mongoose");

const hourSchema = new mongoose.Schema({
  days: { type: String, required: true },
  open: String,
  close: String,
  isClosed: { type: Boolean, required: false },
});

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  rating: { type: Number, min: 0, max: 5, default: 0 },
  foodAndDrink: [String],
  coordinates: { type: [Number], index: "2dsphere" },
  hours: [hourSchema],
  comments: [commentSchema],
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
