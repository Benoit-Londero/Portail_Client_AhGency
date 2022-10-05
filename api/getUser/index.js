const functions = require('../functions/services/router');

module.exports = async function (req,res,next) {
    context.log('Javascript HTTP trigger function processed a request.');

    if( req.body && req.body.task){
        context.res = {
            status: 200,
            body: functions.getUser()
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }    
};