const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

app.set('view engine', 'hbs');
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySQL Connected...")
    }
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());
// req - grab smt from a form
// res - (Wht you wanna send to front end
//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
// app.use('/public/images/', express.static('./public/images'));

app.use('/public/images', express.static('./public/images'));
app.use('/public/css', express.static('./public/css'));
app.use('/public/js', express.static('./public/js'));

app.listen(5000, () => {
    console.log("Server started on port 5000");
});