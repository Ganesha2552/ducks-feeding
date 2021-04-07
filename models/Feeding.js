const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FeedingSchema = new Schema({
  ducks_count: {
    type: Number,
    required: true
  },
  food_quantity: {
    type: Number,
    required: true
  },
  food: {
    type: String,
    required: true
  },
  place_fed: {
    type: String,
    required: true
  },
  time_date_added: {
    type: Date,
    default: Date.now
  },
  food_type:{
    type: String,
    required: true
  },
  is_repeat_food_everyday:{
      type: Boolean,
      default: false
  }
});
module.exports = Feeding = mongoose.model("feeding", UserSchema);