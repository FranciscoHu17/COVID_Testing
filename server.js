const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
/*
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass4root"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("use sbu_covid_db", function (err, result) {
        if (err) throw err;
        console.log("Using sbu_covid_db database");
    });
});
*/
/* Express Routing*/

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/main_page.html"));
});

app.get("/employee", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/employee_login.html"));
});

app.post("/employee", (req, res) =>{
    username = req.body.username;
    password = req.body.password;

    console.log("Username: " + username);
    console.log("Password: " + password);

    /*checkEmployeeCred(username, password, new function(login){
        if(login){
            console.log("LOGGEDIN");
            //redirect
        }
    });*/
});

app.get("/labtech", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/labtech_login.html"));

});

app.get("/test_collection", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/test_collection.html"));
});

app.get("/lab_home", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/lab_home.html"));
});

app.get("/pool_mapping", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pool_mapping.html"));
});

app.get("/well_testing", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/well_testing.html"));
});

checkEmployeeCred = (username, password, callback) => {
    callback(true);
}
port = process.env.PORT || 3000
app.listen(port, () => { console.log("server started!")});