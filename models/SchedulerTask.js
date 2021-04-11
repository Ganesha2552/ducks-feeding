const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const SchedulerSchema = new Schema({
  
  job_data: {
    type: String,
    required: true
  },
  time_of_execution: {
    type: Date,
    required: true
  },
  last_executed_time:{
    type: Date
  },
  time_added: {
    type: Date,
    default:Date.now()
  },
});
module.exports = SchedulerTask = mongoose.model("schedulertasks", SchedulerSchema);