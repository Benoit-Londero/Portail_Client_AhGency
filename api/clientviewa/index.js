module.exports = async function (req, res) {
    let sql = "SELECT * FROM users WHERE Role = 'customer'";

    con.query(sql,function(err,result){
        if (err) throw err;
        res.json(result);
    })
}