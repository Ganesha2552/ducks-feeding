const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/User");
const Feeding = require("../../models/Feeding");
const validateFeedingformInput = require("../../validation/feeding");

// @route POST /api/feeding/create
// @desc Feeding form add record and return success message
// @access Public
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
        autoschedule_enable = false;
        // Authorised user validation
        User.findById(decoded.id).then(user => {

            if (!user) {
                return res.status(401).json({ auth: false, message: "Unauthorised User" });
            }
            autoschedule_enable = user.autoschedule_enable;
        });
        
        const feeding = new Feeding({
            ducks_count: req.body.ducks_count,
            food_quantity: req.body.food_quantity,
            food: req.body.food,
            place_fed: req.body.place_fed,
            food_type: req.body.food_type,
            time_fed: new Date(req.body.time_fed).getTime()
        });

        if (!feeding) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        feeding.save()
            .then(feeding => {
                // if (autoschedule_enable){
                //     //enable scheduler

                // }
                User.findByIdAndUpdate(decoded.id,
                    {
                        $push: { feedings: feeding.id },

                    },
                    { new: true, useFindAndModify: false });
                res.json({
                    success: true, message: "Entry added Successfully"
                })
            })
            .catch(err => console.log(err));


        });
    
});



module.exports = router;