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
  time_fed: {
    type: String,
    required: true
  },
  food_type:{
    type: String,
    required: true
  },
  autoschedule_enable:{
    type: Boolean,
    default:false
  },
  datentime: {
    type: Date,
    default:Date.now()
  },
});
module.exports = Feeding = mongoose.model("Feeding", FeedingSchema);