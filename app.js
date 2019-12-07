const express = require("express");
const mysql = require("mysql");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //access images, css, js

var loggedIn = false;

//routes
app.get("/", function(req, res){
    res.render("index", {
        "log": loggedIn
    });
});//root

app.get("/AdminLog-In", function(req, res){
    res.render("log-in");
});//AdminLog-In

app.get("/check", function(req, res){
    if(req.query.use == "Admin123" && req.query.pass == "Test123") {
        loggedIn = true;
        res.redirect("/admin");
    } else {
        res.redirect("/");
    }
});//verification

app.get("/admin", function(req, res){
    res.render("admin");
});//admin

app.get("/logout", function(req, res){
    loggedIn = false;
    res.redirect("/");
});//admin


app.get("/addItem", function(req,res){
    res.render("addItem");
});//add item

app.get("/updateItem", async function(req,res){
    res.render("updateItem")
});//add item

app.get("/deleteItem", function(req,res){
    let message = "Item was deleted from the database";
    res.render("admin");
});//add item

// app.get("/dbTest", function(req, res){
//     let conn = dbConnection();
    
//     conn.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         // let sql = "SELECT CURDATE()";
//         let sql = "SELECT * FROM q_author WHERE sex = 'F'";
    
//         conn.query(sql, function (err, rows, fields) {
//             if (err) throw err;
//             conn.end();
//             res.send(rows);
//         });
        
//     });//connect
    
// });//dbTest

//values in red must be updated
// function dbConnection(){

//     let conn = mysql.createConnection({
//         host: "",
//         user: "",
//         password: "",
//         database:""
//     });//createConnection

//     return conn;
// }

//running server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});