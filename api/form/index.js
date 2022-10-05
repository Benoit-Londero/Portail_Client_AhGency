const mysql = require('mysql');
const fs = require('fs');
const {conn} = require('../db/db.js');

module.exports = async function (context, req) {
    try {

      conn.connect(
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
          let mail = req.body.email;
        let pwd = req.body.pwd;
        
        let sql = "SELECT * FROM users WHERE email = ? and Pass = ?";
        let reqCheckID = "SELECT ID FROM users WHERE email = ?";
        let reqPwd = "SELECT Pass FROM users WHERE email = ?";

        console.log(req.body);

        conn.query(reqCheckID, [mail], function (err, result) {
            if (err) throw err;
            if (result.length === 1)
            {
                conn.query(reqPwd, [mail], function (err, resultat){
                    if (err) throw err;
                    let passRes = resultat[0].Pass;
                    bcrypt.compare(pwd, passRes, (err, resp) => {
                        if (err) throw err;
                        if (!resp) {
                            console.log('nul');
                            res.status(401).json({ message: 'mauvais mot de passe' });
                        }
                        else {
                            //let TKEN = jwt.sign({userID: result[0].ID},'JETETIENSTUMETIENSPARLABARBICHETTELEPREMIERDENOUSDEUXQUIRRIAAURAUNETAPETTE', { expiresIn: '24h'});
                            conn.query(sql, [mail, passRes],function (err, rlt) {
                                if (err) throw err;
                                //rlt.push({token: TKEN})
                                console.log(rlt);
                                res.status(200).json(rlt);
                            });
                        }
                    })
                })
            }
            else {
                res.status(401).json({message: 'mauvais mail'});
                console.log(res.statusCode);
            }
        })
      }

      context.res = {
        status: 200,
        body : `Request succeed`
      };
    

    } catch(error) {
      const err = JSON.stringify(error);
      context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
  };