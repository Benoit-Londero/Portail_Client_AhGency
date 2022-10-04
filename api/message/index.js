/* module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
    /*    body: responseMessage
     };
} */

const mysql = require("mysql");

module.exports = async function (context, req) {

    const connectionString = process.env.DATABASE_CONNECTION_STRING;

    const sql = mysql.createConnection(connectionString);
    const req = sql.query('SELECT email FROM users where id = 1',function(err,result){
        if (err) throw err;
        res.json(result)
    });

    context.res.json({
        text: req,
    });
};