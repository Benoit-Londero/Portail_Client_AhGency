/* const {con} = require('../db/db');

module.exports = async function (context) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sql = con.query('SELECT * FROM users');
    console.log(sql);

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200,
        body: responseMessage
    };
} */
var str = process.env.

const todoService = require('../todo');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = {
        status: 200,
        body: todoService.getTodos(context)
    };
};