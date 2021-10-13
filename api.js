const express = require('express');
const expressApp = express();
const app = require('./app');

const { API_PORT } = require('./consts');

expressApp.use(express.urlencoded());
expressApp.use(express.json());
expressApp.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

expressApp.get('/users/source/:type', function (req, res) {
    if (req.params.type === 'text') {
        app.getUsers(res);
    } else if (req.params.type === 'database') {
        app.getUsersFromDatabase(res);
    } else {
        res.end('Wrong type. Allowed types: text, database.');
    }    
})

expressApp.get('/users/:id', function (req, res) {
    app.getUser(req.params.id, res);
});

expressApp.post('/users', function (req, res) {
    app.addUser(req.body, res);    
 })

 expressApp.delete('/users/:id', function (req, res) {
    app.deleteUser(req.params.id, res);
});

const api = expressApp.listen(API_PORT, function () {
    const host = api.address().address !== '::' ? api.address().address : 'localhost';
    const port = api.address().port;
    console.log("API is running at http://%s:%s", host, port)
})