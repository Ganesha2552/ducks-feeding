const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/User");
const Feeding = require("../../models/Feeding");
const validateFeedingformInput = require("../../validation/feeding");
const validateFeedingDelete = require("../../validation/feedingrecorddelete");
const validateFeedingUpdate = require("../../validation/feedingrecordupdate");
const converter = require('json-2-csv');

const mongoose = require("mongoose");
const SchedulerTask = require("../../models/SchedulerTask");

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
                    //Data added to db for scheduler
                    const scheduleData = new SchedulerTask({
                        job_data:decoded.id+"##"+feeding.id,
                        time_of_execution:new Date(new Date().getTime() + 60 * 60  * 24 * 1000)
                    }); 
                    scheduleData.save();
            
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
                   
                  
                   
                renameKey= ( obj ) =>{
                    obj["Number of ducks"] = obj["ducks_count"];
                    delete obj["ducks_count"];

                    obj["Food given"] = obj["food"];
                    delete obj["food"];
                    obj["Place of Feed"] = obj["place_fed"];
                    delete obj["place_fed"];
                    obj["Food Category"] = obj["food_type"];
                    delete obj["food_type"];
                    obj["Time of Fed"] = obj["time_fed"];
                    delete obj["time_fed"];
                    obj["Quantity of food given (in lbs)"] = obj["food_quantity"];
                    delete obj["food_quantity"];
                  }
                records.forEach( obj => renameKey( obj ) );
                    converter.json2csv(records,(errorcsv, csv) => {
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
router.delete("/delete/:id", (req, res) => {
    //token validation
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided. Unauthorised' });

    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token. Invalid Token' });
        // id validation
        const { errors, isValid } = validateFeedingDelete(req.params);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const id = req.params.id;
        // Authorised user validation
        User.findById(decoded.id).then(user => {

            if (!user) {
                return res.status(401).json({ auth: false, message: "Unauthorised User" });
            }
            feedingIds = user.feedings;
            console.log(feedingIds.indexOf(id));
            if (feedingIds.indexOf(id) == -1) {
                return res.status(400).json({ auth: false, message: 'Not a valid record! unable to delete' });
            }
            Feeding.findByIdAndDelete(id, function (err, docs) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to delete.Try after sometime.' });
                }
                User.findByIdAndUpdate(decoded.id, { $pull: { feedings: id } }, { safe: true, upsert: true }, function (err, model) {
                    if (err) {
                        return res.status(500).send({ auth: false, message: '1Failed to delete.Try after sometime.' });
                    }
                    SchedulerTask.deleteOne(decoded.id+"##"+id);
                    return res.status(204).json({
                        success: true, message: "Entry deleted Successfully"
                    });
                });


            });

        });
    });

});

module.exports = router;