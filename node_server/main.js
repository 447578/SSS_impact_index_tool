const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const PORT = 8080;

app.use(require('./routes'));

app.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
});

module.exports = app;