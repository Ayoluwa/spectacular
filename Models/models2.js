const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchemaII = new Schema({

user_id: {type: String, required: true},
hobbies: {type: String, require: true},


});


module.exports = User = mongoose.model("Users", UserSchemaII)