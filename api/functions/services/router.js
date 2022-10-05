/* const {conn} = require('../../db/db.js');
const bcrypt = require("bcrypt");

module.exports = {

    getUser: function(){
        let sqlQuery = "SELECT ID, Login FROM users";

        conn.query(sqlQuery, function(err,result){
            if(err) throw err;
            return result;
        })
    },

    viewall: function(){
        let sql = "SELECT * FROM timesheet";

        conn.query(sql,function(err,result){
            if (err) throw err;         
            res.json(result);
        })
    },

    clientviewa: function(){
        let sql = "SELECT * FROM users WHERE Role = 'customer'";

        conn.query(sql,function(err,result){
            if (err) throw err;
            res.json(result);
        })
    },

    timesheet: function(){
        let sql = "SELECT * FROM timesheet WHERE ID_Client = ?";
        let currentUser = req.body.currentIDUser;

        conn.query(sql,function(err,result){
            if (err) throw err;
            res.json(result);
        })
    },

    form: function(context){
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
    },

    inscription: function(){
        let insc = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            pass: bcrypt.hashSync(req.body.pass,10,function(err,hash){}), // On hash le password avant de l'injecter dans la db
            mail: req.body.email,
            login: req.body.nom + req.body.prenom // Création du Login avec le nom & prenom
        }
        
        let sql = "INSERT INTO users(Login,Nom,Prenom,Pass,email) VALUES (?,?,?,?,?)";
        
        //Insert dans la DB
        conn.query(sql, [insc.login,insc.nom,insc.prenom,insc.pass,insc.mail], function (err,result){
            if (err) throw err;
            res.json(result);
        })
    },

    TSForm: function(){
        let time = req.body.duree_tache;
        let developpeur = req.body.who_do_it;
        let date = req.body.date_tache;
        let tache = req.body.tache;
        let client = req.body.for_who;

        let querySQL = "INSERT INTO timesheet(ID_Client,developpeur,time,informations,date_travail) VALUES (?,?,?,?,?)";
        let querySQL2 = "UPDATE users SET heures_restantes = heures_restantes - ? WHERE ID = ?";

        conn.query(querySQL, [client,developpeur,time,tache,date], function (err,result){
            if (err) throw err;
            res.json(result);
            })

        conn.query(querySQL2, [time, client], function (err, resultat) {
            if (err) throw err;
            return resultat;
        })
    },

    HeureFORM: function(){
        let duree = req.body.heure_achete * 60;
        let client = req.body.for_who;
        let date_achat = req.body.date_Achat;

        let qSQL = "UPDATE users SET heures_restantes = heures_restantes + ?, heures_totales = heures_totales + ? WHERE ID = ?";

        let qSQL2 = "INSERT INTO achat(ID_Client,Date) VALUES (?,?)";

        conn.query(qSQL, [duree,duree,client], function (err,results){
            if (err) throw err;
            res.json(results);
        })

        conn.query(qSQL2, [client,date_achat], function (err,ress){
            if (err) throw err;
            return ress;
        })
    }
} */