const mysql = require('mysql');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {

  let addHours;

  addHours = await new Promise((resolve,reject) => {
    
      let duree = req.body.heure_achete * 60;
      let client = req.body.for_who;
      let date_achat = req.body.date_Achat;
  
      let qSQL = "UPDATE users SET Minutes_Restantes = Minutes_Restantes + ?, Minutes_Achetees = Minutes_Achetees + ? WHERE ID = ?";
      let qSQL2 = "INSERT INTO achat(ID_Client,Date) VALUES (?,?)";
  
      con.query(qSQL, [duree,duree,client], function (err,results){
        if (err) throw err;

        console.log('Heure ajoutée')
      })
  
      con.query(qSQL2, [client,date_achat], function (err,ress){
        if (err) throw err;
        
        console.log('Achat ajouté')

        addHours = 'Heures & Achat ajoutés'
        resolve(addHours)
      })
  })

  context.res = {
    status:200,
    body: addHours
  }
};