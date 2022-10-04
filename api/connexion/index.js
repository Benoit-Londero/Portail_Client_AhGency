module.exports = async function (req, res, next) {
    let sqlQuery = "SELECT ID, Login FROM users";

    con.query(sqlQuery, function(err,result){
        if(err) throw err;
        res.json(result);
    })
}