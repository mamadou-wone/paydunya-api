require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
var mongoose = require("mongoose");

const app = express();
// Log requests to the console.
app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(__dirname + process.env.LOG_PATH + 'backend.log', { flags: 'a' })
app.use(logger('combined', { "stream": accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

let corsOptions = {
    origin: '*'
};

if (process.env.ACTIVATE_CORS === 'true') {
    let whitelist = ['http://localhost:4200'];

    corsOptions = {
        origin: function(origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    };
}

app.use(cors(corsOptions));


let url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + process.env.DB_HOST + "/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
//console.log(url);
// let url = "mongodb://localhost:27017/election";
// let url = "mongodb+srv://amir:amir@cluster0.q6eqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established succesfully");
});


// app.use('/bo/v1', require('./routes/back-office'));

require('./routes')(app);

app.get('*', (req, res) =>
    res.status(200).send({
        message: 'Amir WONE... :( :)',
    }),
);

module.exports = app;