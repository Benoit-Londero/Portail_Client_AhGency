const mysql = require('mysql2');
const {con} = require('../db/db.js');

module.exports = async function (context,req,res) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let response;
  response = await new Promise((resolve,reject) => {
    
    let mail = req.body.email;
    let nom = req.body.nom;
    let tva = req.body.tva;
    let adresse = req.body.adresse;
    let tel = req.body.telephone;
    let web = req.body.web;
    let ide = req.body.idE;

    let sql = "UPDATE entreprise SET Nom_societe = ?, TVA = ?, Adresse = ?, Telephone = ?, Email = ?, Site_web = ? WHERE ID_entreprise = ?";

        //Insert dans la DB
    con.query(sql, [nom, tva, adresse, tel, mail, web, ide], function (err,result){
        if (err) throw err;
        
        response = result;
        resolve(response)
    })
  })

  context.res = {
    status: 200,
    headers: {'Content-Type':'application/json'},
    body: response
  }
}
