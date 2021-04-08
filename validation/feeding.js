const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateFeedingformInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    console.log("passed");

    data.ducks_count = !isEmpty(data.ducks_count) ? data.ducks_count : 0;
    data.food_quantity = !isEmpty(data.food_quantity) ? data.food_quantity : 0;
    console.log("passed");
    data.food = !isEmpty(data.food) ? data.food : "";
    data.place_fed = !isEmpty(data.place_fed) ? data.place_fed : "";
    data.food_type = !isEmpty(data.food_type) ? data.food_type : "";
    data.time_fed = !isEmpty(data.time_fed) ? data.time_fed : "";
    // Ducks count checks
    if (Validator.isEmpty(data.ducks_count)) {
        errors.ducks_count = "Ducks count is required";
    } else if (!Validator.isNumeric(data.ducks_count)) {
        errors.ducks_count = "Ducks count is a number";
    } else if (data.ducks_count < 1) {
        errors.ducks_count = "Ducks count should be greater than 0";
    }
    // Food quantity checks
    if (Validator.isEmpty(data.food_quantity)) {
        errors.food_quantity = "Food quantity field is required";
    } else if (!Validator.isNumeric(data.food_quantity)) {
        errors.food_quantity = "Food quantity is a number";
    } else if (data.food_quantity < 1) {
        errors.food_quantity = "Food quantity should be greater than 0";
    }

    // Food given checks
    if (Validator.isEmpty(data.food)) {
        errors.food = "Food given field is required";
    } else if (!Validator.isLength(data.food, { min: 3, max: 30 })) {
        errors.food = "Food Name must be at least 3 characters";
    }

    //Place of feeding checks
    if (Validator.isEmpty(data.place_fed)) {
        errors.place_fed = "Place of feeding field is required";
    } else if (!Validator.isLength(data.place_fed, { min: 3, max: 30 })) {
        errors.place_fed = "Place of feeding must be at least 3 characters";
    }

    //Food type checks
    if (Validator.isEmpty(data.food_type)) {
        errors.food_type = "Food type field is required";
    } else if (!Validator.isLength(data.food_type, { min: 3, max: 30 })) {
        errors.food_type = "Food type must be at least 3 characters";
    }

    //Food fed time checks
    if (!Validator.toDate(data.time_fed)) {
        errors.time_fed = "Food fed time should be a valid date";
    } else if (!Validator.isBefore(data.time_fed)) {
        errors.time_fed = "Food fed time should be a past time";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};



