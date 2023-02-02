const mysql = require('mysql');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {

  let chrono;

  chrono = await new Promise((resolve,reject) => {
    
      let time = req.body.temps;
      let conv = time < 60 ? 1 : time/60

      let qSQL = "INSERT INTO logs_entree_timesheet(ID_admin,Temps,ID_Tache) VALUSE(?,?,?)"; //SQL pour Update la table ENTREPRISE
  
      con.query(qSQL,[1,conv,1], function (err,results){
        if (err) throw err;

        console.log('Logs enregistré')
        resolve('Le temps a été ajouté')
      })
  })

  context.res = {
    status:200,
    body: chrono
  }
}