const bcrypt = require("bcrypt");
const {con} = require('../db/db.js');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    let insc = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        pass: bcrypt.hashSync(req.body.pass,10,function(err,hash){}), // On hash le password avant de l'injecter dans la db
        mail: req.body.email,
        login: req.body.nom + req.body.prenom // Création du Login avec le nom & prenom
    }

    let sql = "INSERT INTO users(Login,Nom,Prenom,Pass,email) VALUES (?,?,?,?,?)";

    //Insert dans la DB
    con.query(sql, [insc.login,insc.nom,insc.prenom,insc.pass,insc.mail], function (err,result){
        if (err) throw err;
        res.json(result);
    })
}