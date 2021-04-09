const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateFeedingDelete(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.id = !isEmpty(data.id) ? data.id : "";
    if (Validator.isEmpty(data.id)) {
        errors.id = "id is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};