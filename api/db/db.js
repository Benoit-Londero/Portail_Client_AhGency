const mysql = require("mysql");

const connString = process.env.DATABASE_CONNECTION_STRING;
const con =mysql.createConnection(connString);      

module.exports = {
     con
}