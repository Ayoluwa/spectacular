const Validator = require("Validator");
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

data.name = !isEmpty(data.name)? data.name : "";
data.email = !isEmpty(data.email)? data.email : "";
data.password = !isEmpty(data.password)? data.password : "";
data.password2 = !isEmpty(data.password2)? data.password2: "";

//Name checks
if(Validator.isEmpty(data.email)){
    errors.email = "Email field is required"
}   else if (!Validator.isEmail(data.email)){
    errors.email = "Email is invalid";
}

// Password Checks

if(Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
} 

if (Validator.isEmpty(data.password2)){
    errors.password2 = "Password is also required Here";
}

if (Validator.isEmpty(data.gender)){
    errors.gender = "Heyy...Kindly indicate your gender";
}

if (Validator.isEmpty(data.hobbies)){
    errors.hobbies = "Heyy...Kindly indicate your gender";
}

if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = "Password has to be atleast 6 and less than 30.";
}

if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match...Kindly act accordingly";

}

return {
    errors,
    isValid:isEmpty(errors)
};




































}