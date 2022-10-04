const mysql = require("mysql");

const con =mysql.createConnection(
          process.env.DATABASE_CONNECTION_STRING
);

module.exports = {
     con
}