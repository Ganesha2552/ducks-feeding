module.exports = function validateFeedingUpdate(data,id,feeding) {
    let errors = {};
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
