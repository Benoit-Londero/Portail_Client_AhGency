const mysql = require('mysql');
const fs = require('fs');
const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");

module.exports = async function (context, req) {
    try {
      con.connect(
        function (err){
          if(err){
            console.log("!!! Cannot connect !!! Error:")
            throw err;
          }
          else {
            console.log("connection established.");
            form();
          }
        }
      )

      function form(){
        let mail = context.req.body.email;
        let pwd = context.req.body.pwd;
        
        
        let reqCheckID = "SELECT ID FROM users WHERE Email = '" + mail + "'";
        let reqPwd = "SELECT Password FROM users WHERE Email = '" + mail + "'";

        con.query(reqCheckID, function (err, result) {
            if (err) throw err;
            console.log('AAA');

            if (result.length === 1){
                con.query(reqPwd, function (err, resultat){

                    console.log('BBBB');
                    if (err) throw err;
                    let passRes = resultat[0].Password;

                    let sql = "SELECT * FROM users WHERE Email = '" + mail + "' and Password = '" + passRes + "'";

                    bcrypt.compare(pwd, passRes, (err, resp) => {
                        if (err) throw err;
                        if (!resp) {
                            console.log('nul');
                            context.res = {
                              status :401,
                              body: 'mauvais mot de passe' 
                            };
                        }
                        else {
                            //let TKEN = jwt.sign({userID: result[0].ID},'JETETIENSTUMETIENSPARLABARBICHETTELEPREMIERDENOUSDEUXQUIRRIAAURAUNETAPETTE', { expiresIn: '24h'});
                            con.query(sql,function (err, rlt) {

                              console.log('HIIII');
                              console.log(rlt);
                                if (err) throw err;
                                //rlt.push({token: TKEN})
                                console.log(rlt);
                                console.log('Vous êtes connecté');
                                context.res = {
                                  status: 200,
                                  headers:{ "Content-Type": "application/json" },
                                  body : JSON.parse(rlt[0].ID)
                            }});
                        }
                    })
                })
            }
            else {
                context.res = {
                  status: 401,
                  body : 'mauvais mail'
                };
            }
        })
      }

    } catch(error) {
      const err = JSON.stringify(error);
      context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
  };