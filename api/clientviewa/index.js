module.exports = async function (context, req) {
    let sql = "SELECT * FROM users WHERE Role = 'customer'";

    con.query(sql,function(err,result){
        if (err) throw err;
        res.json(result);
    })
}