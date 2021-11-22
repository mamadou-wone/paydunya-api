require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
var mongoose = require("mongoose");

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established succesfully");
});

require('./routes')(app);

app.get('*', (req, res) =>
    res.status(200).send({
        message: 'Amir WONE... :( :)',
    }),
);

module.exports = app;