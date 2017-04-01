// models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var emailSave = mongoose.Schema({

    createDate       :{
        type         : Date,
        default      : Date.now()
    },
    email           : String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('emaiSave', emailSave);