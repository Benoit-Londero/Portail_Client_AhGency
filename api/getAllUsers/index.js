const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let allUsers;

    allUsers = await new Promise((resolve,reject) => {
        let query = "SELECT * FROM users";
        req = con.query(query, function (err,rows){
            if (err) throw err;

            allUsers = rows;
            resolve(allUsers)
        })
    })

    context.res = {
        status : 200,
        body : allUsers
    }   
}
