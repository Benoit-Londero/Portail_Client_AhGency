const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
  context.log('Javascript HTTP trigger function processed a request.');

  let updateTask;

  updateTask = await new Promise((resolve,reject) => {

    let time = req.body.timeSpend;
    let statut = req.body.state;
    let descr = req.body.descr_;
    let idTask = req.body.id_task;
        
    let querySQL = "UPDATE timesheet SET Temps_Min_Tache = ?,Informations = ?,Statut = ? WHERE ID_TS = ?";

    con.query(querySQL, [time,descr,statut,idTask], function (err,result){
        if (err) throw err;

        console.log('Tache ajoutée')
        
        updateTask = 'Timesheet mis à jour';  
        resolve(updateTask);
    })
  })
    
  context.res = {
    status: 200,
    body : updateTask
  };

};