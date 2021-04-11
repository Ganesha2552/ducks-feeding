const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const feeding = require("./routes/api/feeding");
const path =require("path");
const app = express();
const scheduler = require('node-schedule');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
const SchedulerTask = require("./models/SchedulerTask");
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


//runs scheduler for executing tasks in Db
var rule = new scheduler.RecurrenceRule();

rule.minute = new scheduler.Range(0, 59, 5);
console.log("calling scheduler:::");
scheduler.scheduleJob(rule, function(){
  SchedulerTask.find({
    "time_of_execution": { 
        $lte: new Date()
    }
  }).then(records=>{
    records.forEach(val=>{
    splitarr=val.job_data.split("##");
    userId=splitarr[0];
    feedId=splitarr[1];

    Feeding.findById(feedId).then(record =>{
    const recordobj = new Feeding({
    ducks_count: record.ducks_count,
    food_quantity: record.food_quantity,
    food: record.food,
    place_fed: record.place_fed,
    food_type: record.food_type,
    time_fed: record.time_fed,
    autoschedule_enable: false
    });
    recordobj.save().then(recordobj=>{
    User.findOneAndUpdate({ _id: userId },
    { $push: { feedings: recordobj.id } }, { safe: true, upsert: true }, function (err, model) {
        console.log(model);
    });
    })

    SchedulerTask.findByIdAndUpdate(val.id,{time_of_execution:new Date(new Date(parseInt(val.time_of_execution).getTime()) + 60 * 60 * 24 * 1000),last_executed_time:Date.now()}, { safe: true, upsert: true }, function (err, model) {
      console.log(model);
  });

    }

    );
    })
    }

  );
});

// Routes
app.use("/api/users", users);
app.use("/api/feeding", feeding);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'))
  });
}
const port = process.env.PORT || 5000; // process.env.port is Heroku's port 
app.listen(port, () => console.log(`Server and running on port ${port} !`));