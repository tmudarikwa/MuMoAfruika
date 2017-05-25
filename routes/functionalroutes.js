var express = require('express');
var router = express.Router();

var saveEmail = require('../models/queries/saveEmail');

var date = new Date();

module.exports = function (app, passport){

    // =====================================
    // EMAIL SUBSCRIPTION
    // =====================================
   
    app.post('/subscribeemail', function(req,res){
        sendEmail.sendContactEmail(req,res);
    });
}

