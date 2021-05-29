const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var db = require('./db');

const userroute = require('./routes/user'); // import the routes

app.use(express.json());

const port = 3000

//to use the routes
app.use('/user/',userroute)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  });