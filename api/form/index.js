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
        
        let sql = "SELECT * FROM users WHERE Email = ? and Password = ?";
        let reqCheckID = "SELECT ID FROM users WHERE Email = ?";
        let reqPwd = "SELECT Password FROM users WHERE Email = ?";

        con.query(reqCheckID, [mail], function (err, result) {
            if (err) throw err;
            if (result.length === 1)
            {
                con.query(reqPwd, [mail], function (err, resultat){
                    if (err) throw err;
                    let passRes = resultat[0].Pass;
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
                            con.query(sql, [mail, passRes],function (err, rlt) {
                                if (err) throw err;
                                //rlt.push({token: TKEN})
                                console.log(rlt);
                                console.log('Vous êtes connecté');
                                context.res = {
                                  status: 200,
                                  body : rlt
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

/*       context.res = {
        status: 200,
        body : `Request succeed`
      }; */

    } catch(error) {
      const err = JSON.stringify(error);
      context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
  };