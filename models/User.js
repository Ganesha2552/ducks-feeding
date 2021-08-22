const mongoose = require("mongoose");
const Feeding = require("./Feeding");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isadmin:{
    type: Boolean,
    default: false
},feedings:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: Feeding
}]

});
module.exports = User = mongoose.model("users", UserSchema);