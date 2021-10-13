const sqlite3 = require('sqlite3').verbose();

var connection = null;

const connect = function() {

    if (!connection) {
        connection = new sqlite3.Database('./data/test.db', (err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Connected to the database.');
        });
    }
    
    return connection;
};

const getUsers = function() {

    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users;`;

        connect().all(sql, [], (err, users) => {
            if (err) {
                reject(err);
            }
            
            connect().close((err) => {
                if (err) {
                    reject(err);
                }
                console.log('Close the database connection.');
            });

            resolve(users);            
        });  
    });
}

/*sql = `SELECT * FROM users WHERE id  = ?`;
let userId = 1;

connect().get(sql, [userId], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  return row
    ? console.log(row.id, row.name)
    : console.log(`No user found with the id ${playlistId}`);

});*/

module.exports = {
    getUsers
}