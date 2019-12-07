const express = require("express");
const mysql = require("mysql");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //access images, css, js
app.use(express.urlencoded()); //use to parse data sent using the POST method
const sha256  = require("sha256");
const session = require('express-session');

app.use(session({ secret: 'any word', cookie: { maxAge: 60000 }}));

//routes
app.get("/", function(req, res){
    
    res.render("home");
    
});//root

app.get("/AdminLog-In", function(req, res){
    
    res.render("log-in");
    
});//AdminLog-In

app.post("/check", function(req, res){
    //spacey
    if(req.body.username == "admin" && sha256(req.body.password) == "df9366ecf858656e8dba29c9b21309149d3eb8fa6259e99ba74394a152048bb7") {
        req.session.authenticated = true;
        res.send({"check":true});
    } else {
        res.send(false);
    }
    
});//verification

app.get("/admin", function(req, res){
    
    res.render("admin");
    
});//admin

app.get("/logout", function(req, res){
    
    req.session.destroyed;
    res.render("log-in");
    
});//logout

app.get("/buildShip", function(req, res){
    
    res.render("build");
    
});//logout

app.get("/shopcart", function(req, res){
    
    res.render("cart");
    
});//logout


app.get("/addItem", function(req,res){
    res.render("addItem");
});//add item

app.post("/addItem", function(req, res){
    console.log(req.body);
    
    let message = "Item was NOT added to the system";
    if(false){
        message = "Item was added to the system";
    }
    
    res.render("addItem", {"message":message});
});//add item post

app.get("/updateItem", async function(req,res){
    res.render("updateItem")
});//add item

app.post("/updateItem", function(req,res){
    console.log(req.body);
    
    let message = "Item was NOT updated";
    if(false){
        message = "Item was updated successfully";
    }
    res.render("updateItem", {"message":message});
});//update item post

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


function insertItem(body){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw(err);
            console.log("Connected!");
            
            let sql = ``;
            
            let params = [];
            
            conn.query(sql, params, function(err, rows, fields){
                if(err) throw(err);
                conn.end()
                resolve(rows);
            })//connect
        })//connect
    })//promise
}