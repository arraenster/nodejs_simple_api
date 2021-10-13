var fs = require('fs');
var database = require('./database');

/**
 * Get users from JSON file
 * @param {Response} response 
 */
const getUsers = function(response) {
    console.log('Fetching users data...');

    fs.readFile( __dirname + "/data/" + "users.json", 'utf8', function (err, data) {        
        response.end(data)
    });
}

const getUsersFromDatabase = function(response) {
    console.log('Fetching users from database...');

    const usersPromise = database.getUsers();
    usersPromise.then(
        (users) => response.end(JSON.stringify(users)),
        (err) => response.end(err)
    ).catch((err) => response.end(err));
}

/**
 * Get one user data
 * @param {int} userId 
 * @param {Response} response 
 */
const getUser = function(userId, response) {
    console.log('Get one user data for ID=' + userId);
    const fileName = __dirname + "/data/" + "users.json";

    fs.readFile(fileName, 'utf8', function (err, data) {
        data = JSON.parse( data );

        if (data.length >= userId) {
            response.end( JSON.stringify(data[userId]));
        } else {
            response.end('User ID is not found.');
        }        
    });    
}

/**
 * Add user to the list
 * @param {Object} user 
 * @param {Response} response 
 */
const addUser = function(user, response) {   
    console.log('Adding new user data...'); 
    const fileName = __dirname + "/data/" + "users.json";

    try {
        fs.readFile(fileName, 'utf8', function (err, data) {
            data = JSON.parse( data );
            data.push(user);
            data = JSON.stringify(data);
            fs.writeFile(fileName, data, function (err) {
                response.end( data );
            })            
         });
    } catch (error) {
        response.end('Something went wrong. ' + error.message);
    }     
}

/**
 * Delete one user data
 * @param {int} userId 
 * @param {Response} response 
 */
const deleteUser = function(userId, response) {
    console.log('Delete user data with ID=' + userId);
    const fileName = __dirname + "/data/" + "users.json";

    fs.readFile(fileName, 'utf8', function (err, data) {
        data = JSON.parse( data );

        if (data.length >= userId) {
            data.splice(userId-1, 1);
            data = JSON.stringify(data);
            
            fs.writeFile(fileName, data, function (err) {
                response.end( data );
            })
        } else {
            response.end('User ID is not found.');
        }        
    });    
}

 module.exports = {
     getUsers,
     getUser,
     addUser,
     deleteUser,
     getUsersFromDatabase
 }