const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { get } = require("http");

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "pass4root" //password: "pass4root"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("use sbu_covid_db", function (err, result) {  //use sbu_covid_db
        if (err) throw err;
        console.log("Using sbu_covid_db database");
    });
});

/* Express Routing*/
var employeeLogin = null;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/main_page.html"));
});

app.get("/employee", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/employee_login.html"));
});

app.post("/employee", (req, res) =>{
    email = req.body.email;
    passcode = req.body.passcode;

    checkEmployeeCred(email, passcode, function(login){
        if(login.length != 0){
            console.log(login);
            employeeLogin = login;
            res.redirect('/employee_home');
        }
        else{
            console.log("Failed Login");
        }
    });
});

app.get("/employee_home", (req, res) => {
    if(employeeLogin != null)
        res.sendFile(path.join(__dirname, "/public/employee_home.html"));
    else
        res.status(403).send("Failed to authenticate your login")
});

app.post("/employee_home", (req, res) => {
    getEmployeeTest(function(employee_results){
        res.send(employee_results)
    });
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

app.post("/pool_mapping", (req, res) => {
    op = req.body.operation.op;
    pool_map = req.body.pool_map;

    if(op === "get"){
        getPoolMap(function(pool_map){
            res.send(pool_map);
        });
    }
    else if(op === "add"){
        insertIntoPoolMap(pool_map.poolBarcode, pool_map.testBarcodes);
        res.send({"success":true});
    }
    else if(op === "del"){
        deleteFromPoolMap(pool_map.poolBarcode, pool_map.testBarcodes);
        res.send({"success":true});
    }
});

app.get("/well_testing", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/well_testing.html"));
});

app.post("/well_testing", (req, res) => {
    op = req.body.operation.op;
    well_test = req.body.well_test;

    if(op === "get"){
        getWellTesting(function(welltesting_results){
            res.send(welltesting_results);
        });
    }
    else if(op === "del"){
        deleteFromWellTesting(well_test.poolBarcode, well_test.wellBarcode, well_test.result);
        res.send({"success":true});
    }
    else if(op === "add"){
        insertIntoWellTesting(well_test.poolBarcode, well_test.wellBarcode,
                            well_test.startTime, well_test.endTime, well_test.result);
        res.send({"success":true});
    }
});

checkEmployeeCred = (email, passcode, callback) => {
    sql = "SELECT employeeID " +
          "FROM employee " +
          "WHERE email=\"" + email + "\" AND " +
                "passcode=\"" + passcode + "\"";
    con.query(sql, function (err,result){
        if(err) console.log(err);
        else{ 
            callback(result[0]);
        }
    });
}

getEmployeeTest = (callback) => {
    sql = "SELECT ET.collectionTime, WT.result " +
          "FROM employeetest ET, poolmap PM, welltesting WT " +
          "WHERE ET.employeeID = \"" + employeeLogin.employeeID + "\" AND " +
                "ET.testBarcode = PM.testBarcode AND " +
                "PM.poolBarcode = WT.poolBarcode"
    con.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            callback(result);
        }
    });
}

getPoolMap = (callback) => {
    sql = "SELECT poolBarcode, testBarcode " +
          "FROM poolmap "
    con.query(sql, function(err, result){
        if(err) console.log(err)
        else{
            callback(result);
        }
    });
}

insertIntoPoolMap = (pool, tests) => {
    insertIntoPool(pool)
    
    for(i = 0; i < tests.length; i++){
        test = tests[i];
        sql = "INSERT INTO poolmap " +
              "VALUES(\"" + test + "\",\"" + pool + "\")";
        con.query(sql, function(err, result){
            if(err) console.log(err);
            else console.log("Inserted pool map: " + pool + ", " + test);
        });
    }    
}

deleteFromPoolMap = (pool, tests) => {
    for(i = 0; i < tests.length; i++){
        test = tests[i];
        sql = "DELETE FROM poolmap " +
              "WHERE poolBarcode = \"" + pool + "\" AND " +
                    "testBarcode = \"" + test + "\" " +
              "LIMIT 1"
        con.query(sql, function(err, result){
            if(err) console.log("Unable to delete");
            else console.log("Deleted pool map: " + pool + ", " + test);
        });
    }
    
}

getWellTesting = (callback) => {
    sql = "SELECT wellBarcode, poolBarcode, result " +
          "FROM welltesting "
    con.query(sql, function(err, result){
        if(err) console.log(err)
        else{
            callback(result);
        }
    });
}

insertIntoWellTesting = (pool, well, start, end, status) => {
    insertIntoPool(pool);
    insertIntoWell(well);

    sql = "INSERT INTO welltesting " +
          "VALUES(\"" + pool + "\",\"" + well + "\",\"" + start + "\",\"" + end + "\",\"" + status + "\")"
    con.query(sql, function(err, result){
        if(err) console.log(err);
        else console.log("Inserted well testing: " + pool + ", " + well + ", " + start + ", " + end + ", " + status);
    });
}

insertIntoWell = (well) => {
    sql = "INSERT INTO well " +
          "VALUES(\"" + well + "\")"
    con.query(sql, function(err, result){
        if(err) console.log(well + " already exists");
        else console.log("Inserted well: " + well);
    });
}

insertIntoPool = (pool) =>{
    sql = "INSERT INTO pool " +
          "VALUES(\"" + pool + "\")"
    con.query(sql, function(err, result){
        if(err) console.log(pool + " already exists");
        else console.log("Inserted pool: " + pool);
    });
}

deleteFromWellTesting = (pool, well, status) => {
    sql = "DELETE FROM welltesting " +
          "WHERE poolBarcode = \"" + pool + "\" AND " +
                "wellBarcode = \"" + well + "\" AND " +
                "result = \"" + status + "\" " +
          "LIMIT 1"
    con.query(sql, function(err, result){
        if(err) console.log("Unable to delete");
        else console.log("Deleted well testing: " + pool + ", " + well + ", " + status);
    });
}

port = process.env.PORT || 3000;
app.listen(port, () => { console.log("server started!")});