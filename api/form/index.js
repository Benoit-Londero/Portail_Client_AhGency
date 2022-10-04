const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");


module.exports = async function (req, res, next) {
    let mail = req.body.email;
    let pwd = req.body.pwd;
    
    let sql = "SELECT * FROM users WHERE email = ? and Pass = ?";
    let reqCheckID = "SELECT ID FROM users WHERE email = ?";
    let reqPwd = "SELECT Pass FROM users WHERE email = ?";

    console.log(req.body);

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
                        res.status(401).json({ message: 'mauvais mot de passe' });
                    }
                    else {
                        //let TKEN = jwt.sign({userID: result[0].ID},'JETETIENSTUMETIENSPARLABARBICHETTELEPREMIERDENOUSDEUXQUIRRIAAURAUNETAPETTE', { expiresIn: '24h'});
                        con.query(sql, [mail, passRes],function (err, rlt) {
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