const {con} = require('../db/db.js');


module.exports = function (req, res, next) {
    let duree = req.body.heure_achete * 60;
        let client = req.body.for_who;
        let date_achat = req.body.date_Achat;
    
        let qSQL = "UPDATE users SET heures_restantes = heures_restantes + ?, heures_totales = heures_totales + ? WHERE ID = ?";
    
        let qSQL2 = "INSERT INTO achat(ID_Client,Date) VALUES (?,?)";
    
        con.query(qSQL, [duree,duree,client], function (err,results){
            if (err) throw err;
            res.json(results);
        })
    
        con.query(qSQL2, [client,date_achat], function (err,ress){
            if (err) throw err;
            return ress;
        })
}