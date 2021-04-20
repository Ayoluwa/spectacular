const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLogininput(data) {
    let errors = {};

// Convert empty fields to empty strings so we can use the validator functions.
    data.name = !isEmpty(data.name)? data.name : '';
    data.email = !isEmpty(data.email)? data.email : '';
    data.hobbies = !isEmpty(data.hobbies)? data.hobbies : '';
    data.password = !isEmpty(data.password)? data.password: '';
    
 
if (Validator.isEmpty(data.email)) {
    errors.email = 'Kindly input your email in the field'
} else if (!Validator.isEmail(data.email)){

    errors.email = 'Kindly enter your mail address in the appropriate fashion';
}

if (Validator.isEmpty(data.hobbies)) {
    errors.hobbies = 'Kindly input what you\'d rather be found doing in the field'
}



//Password checks
if (Validator.isEmpty(data.password)) {
    errors.password = 'Kindly input your password correctly'
}

return {
    errors,
    isValid: isEmpty(errors)
};


};