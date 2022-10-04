const {con} = require('../db/db.js');

module.exports = async function (req, res, next) {
    let sql = "SELECT * FROM timesheet WHERE ID_Client = ?";
    let currentUser = req.body.currentIDUser;

    con.query(sql,[currentUser],function(err,result){
        if (err) throw err;

        console.log(result);
        res.json(result);
    })
}