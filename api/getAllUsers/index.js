const {con} = require('../db/db');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let query = "SELECT * FROM users";
    req = con.query(query, function (err,rows){
        if (err) throw err;

        context.res = {
            status : 200,
            body : req
        }
    });

    
}