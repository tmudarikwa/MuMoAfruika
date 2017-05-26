var anEmail  = require('../emailsavemodel');
var sendEmail = require('../../config/mandrillemail');

exports.saveEmail = function(req , res)
{	
    var data = req.body;
    
    console.log("************* INSIDE SAVE EMAIl*******************");
    
	anEmail.findOne({"email":data.email} , function(err, anemail){

        console.log("found one result |");
        console.log(anemail);
      
	});
}
