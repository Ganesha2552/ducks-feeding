const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/User");
const Feeding = require("../../models/Feeding");
const validateFeedingformInput = require("../../validation/feeding");
const validateFeedingDelete = require("../../validation/feedingrecorddelete");
const validateFeedingUpdate = require("../../validation/feedingrecordupdate");
const scheduler = require('node-schedule');
const converter = require('json-2-csv');

const mongoose = require("mongoose");

// @route POST /api/feeding/create
// @desc Feeding form add record and return success message
// @access Authenticated
router.post("/create", (req, res) => {
    //token validation
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided. Unauthorised' });

    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token. Invalid Token' });

        // Form validation
        const { errors, isValid } = validateFeedingformInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        // Authorised user validation
        User.findById(decoded.id).then(user => {

            if (!user) {
                return res.status(401).json({ auth: false, message: "Unauthorised User" });
            }
        });

        const feeding = new Feeding({
            ducks_count: req.body.ducks_count,
            food_quantity: req.body.food_quantity,
            food: req.body.food,
            place_fed: req.body.place_fed,
            food_type: req.body.food_type,
            time_fed: req.body.time_fed,
            autoschedule_enable: req.body.autoschedule_enable
        });


        feeding.save()
            .then(feeding => {
                if (feeding.autoschedule_enable) {
                    var rule = new scheduler.RecurrenceRule();
                    var currentdate=new Date();
                    console.log(currentdate.getHours());
                    console.log(currentdate.getMinutes());

                    rule.hour = currentdate.getHours();
                    rule.minute = currentdate.getMinutes();
                    rule.second = 00;
                    rule.dayOfWeek = new scheduler.Range(0, 6);
                    //JOB Id is Feeding object id
                    scheduler.scheduleJob(decoded.id+"##"+feeding.id,rule, function(){
                        console.log("From scheduler "+this.name.split("##"));
                        splitarr=this.name.split("##");
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

                        }

                        );
                    });
                  }
                console.log(feeding.id);
                User.findOneAndUpdate({ _id: decoded.id },
                    { $push: { feedings: feeding.id } }, { safe: true, upsert: true }, function (err, model) {
                        console.log(model);
                    });
                return res.json({
                    success: true, message: "Entry added Successfully"
                })
            })
            .catch(err => console.log(err));


    });

});

/// @route PUT /api/feeding/update
// @desc Feeding form update record and return success message
// @access Authenticated
router.put("/update", (req, res) => {
    //token validation
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided. Unauthorised' });

    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token. Invalid Token' });

        id=Object.keys(req.body)[0];


        // Authorised user validation
        User.findById(decoded.id).then(user => {

            if (!user) {
                return res.status(401).json({ auth: false, message: "Unauthorised User" });
            }
            feedingIds = user.feedings;
            console.log(feedingIds.indexOf(id));
            if (feedingIds.indexOf(id) == -1) {
                return res.status(400).json({ auth: false, message: 'Invalid record' });
            }
            Feeding.findById(id).then(feeding =>{
                // Form validation and compare diff
            const { errors, isValid } = validateFeedingUpdate(req.body,id,feeding);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            }

            );
        });
    });
      
    

});


/// @route PUT /api/feeding/update
// @desc Feeding form update record and return success message
// @access Authenticated
router.get("/", (req, res) => {
    //token validation
    var token = req.headers['x-access-token']?req.headers['x-access-token'] : req.query.token? req.query.token:"";
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided. Unauthorised' });

    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token. Invalid Token' });
        feedingIds = [];
        isAdmin = false;
        User.findById(decoded.id).then(user => {

            if (!user) {
                return res.status(401).json({ auth: false, message: "Unauthorised User" });
            }
            feedingIds = user.feedings;
            isAdmin = user.isadmin;
            console.log("admin::" + isAdmin);
            if (isAdmin) {
                //Fetching all records for admin user
                Feeding.find({}, function (err, records) {
                    console.log(records);
                    if (err) {
                        console.log( err);
                    }
                    // var ln = 100000; 
                    // var arr = [];
                    // for(var i = 0; i < ln; i++){
                    // arr.push({
                    //     key: i, 
                    //     value: i
                    // });
                    // }

                    // var fields = Object.keys(records[0]);
                    // var opts = { fields };
                    // json2csv(arr, opts);
                    converter.json2csv(records, (errorcsv, csv) => {
                        if (errorcsv) {
                            console.log( errorcsv);
                        }
                        // print CSV string
                        console.log(csv);
                        res.attachment('filename.csv');
                        return res.status(200).send(csv); 
                    });


                }).lean().select('-_id -__v -autoschedule_enable');
                //select('datentime ducks_count food food_quantity time_fed food_type place_fed');
               
            } else {
                //Fetching user specific  records for logged-in user

                Feeding.find({ _id: { $in: feedingIds } }, function (err, records) {
                    var recordsMap = {};
                    records.forEach(function (record) {
                        recordsMap[record._id] = record;
                    });
                    return res.json(recordsMap);

                }
                );
            }

        });


    });
});


/// @route PUT /api/feeding/update
// @desc Feeding form update record and return success message
// @access Authenticated
router.delete("/delete", (req, res) => {
    //token validation
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided. Unauthorised' });

    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token. Invalid Token' });
        // id validation
        const { errors, isValid } = validateFeedingDelete(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const id = req.body.id;
        // Authorised user validation
        User.findById(decoded.id).then(user => {

            if (!user) {
                return res.status(401).json({ auth: false, message: "Unauthorised User" });
            }
            feedingIds = user.feedings;
            console.log(feedingIds.indexOf(id));
            if (feedingIds.indexOf(id) == -1) {
                return res.status(400).json({ auth: false, message: 'Invalid record' });
            }
            Feeding.findByIdAndDelete(id, function (err, docs) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to delete.Try after sometime.' });
                }
                User.findByIdAndUpdate(decoded.id, { $pull: { feedings: id } }, { safe: true, upsert: true }, function (err, model) {
                    if (err) {
                        return res.status(500).send({ auth: false, message: '1Failed to delete.Try after sometime.' });
                    }
                    scheduler.cancelJob(id);
                    return res.status(204).json({
                        success: true, message: "Entry deleted Successfully"
                    });
                });


            });

        });
    });

});

module.exports = router;