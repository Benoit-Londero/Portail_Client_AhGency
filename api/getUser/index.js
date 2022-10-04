const functions = require('../functions/services/router');

module.exports = async function (context,req) {
    context.log('Javascript HTTP trigger function processed a request.');
    
    context.res = {
        status: 200,
        body: functions.getUser(context)
    };
};