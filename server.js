// include all required modules
var http = require('http');
const express = require('express');
var bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require("mongodb");

// server details
const app = express();
const port = 2000;

app.use(bodyParser.urlencoded({ extended: true }));
// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Listen on port
app.listen(port, () => console.info(`Listening on port ${port}`))