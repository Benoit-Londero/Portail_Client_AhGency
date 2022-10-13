const {con} = require('./db');

module.exports = {
    getUsers: async function(context) {
        try {
            let query = "SELECT * FROM users";
            con.query(query, function (err,rows){
                  if (err) throw err;
                  const result = JSON.stringify(rows);

                  context.res= {
                    status:200,
                    body: result
                  }
              });
        } catch (error) {
            context.res.status(500).send(error);
        }
    }
}