const {con} = require('../db/db.js');

module.exports = async function (req,res, next) {
    let time = req.body.duree_tache;
    let developpeur = req.body.who_do_it;
    let date = req.body.date_tache;
    let tache = req.body.tache;
    let client = req.body.for_who;

    let querySQL = "INSERT INTO timesheet(ID_Client,developpeur,time,informations,date_travail) VALUES (?,?,?,?,?)";

    let querySQL2 = "UPDATE users SET heures_restantes = heures_restantes - ? WHERE ID = ?";

    con.query(querySQL, [client,developpeur,time,tache,date], function (err,result){
        if (err) throw err;
        res.json(result);
    })

    con.query(querySQL2, [time, client], function (err, resultat) {
        if (err) throw err;
        return resultat;
    })
}