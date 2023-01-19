const mysql = require('mysql');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {

  let message;

  message = await new Promise((resolve,reject) => {
    
      let idu = req.body.currentIDU;
      let mess = req.body.mess;
      let projet = req.body.currentIDE;
  
      let qSQL2 = "INSERT INTO conversation(ID_projet,ID_client,Message) VALUES (?,?,?)";
  
      con.query(qSQL2, [projet,idu,mess], function (err,ress){
        if (err) throw err;
        
        console.log('Message ajouté')

        message = 'Message envoyé avec succes'
        resolve(message)
      })
  })

  context.res = {
    status:200,
    body: message
  }
};