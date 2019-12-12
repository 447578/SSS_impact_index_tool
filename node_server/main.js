const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const fs = require('fs')

// fs.unlinkSync('database.db');

const db = new Database('database.db');
db.exec(fs.readFileSync('sqlitedatabase.sql').toString());


const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const PORT = 8080;

app.use(require('./routes'));

app.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
});

module.exports = app;