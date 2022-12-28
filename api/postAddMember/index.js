const mysql = require('mysql');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {

  let addMember;

  addMember = await new Promise((resolve,reject) => {
    
      let members = req.body.members;
      let str_members = members.join(", ")
      let ID_Entreprise = req.body.id_entr;
  
      let qSQL = "UPDATE users SET Membres = ? WHERE ID_entreprise = ?";
  
      con.query(qSQL, [str_members,ID_Entreprise], function (err,results){
        if (err) throw err;

        console.log('Membres ajoutée')
        resolve('Les membres ont été ajoutés')
      })
  })

  context.res = {
    status:200,
    body: addMember
  }
};