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

app.get("/admin", async function(req, res){
    
    let itemList = await getItemList();
    //console.log(itemList);
    res.render("admin", {"itemList":itemList});
    
});//admin

app.get("/logout", function(req, res){
    
    req.session.destroyed;
    res.render("log-in");
    
});//logout

let displays = [];
let valuesEntered = [];
let positionEntered = [];
let prices = [];
let totalPrice = [0];

app.get("/buildShip", async function(req, res){
    
    let materials = await getMaterials();
    let enginePrice = await getEnginePrice();
    let weights = await getWeight();
    
    displays = [];

    res.render("build", {
        "materials": materials,
        "prices": enginePrice,
        "weights": weights,
        "displaying": displays
    });
    
});//buildShip

app.post("/buildShip", async function(req, res){
    
    let materials = await getMaterials();
    let enginePrice = await getEnginePrice();
    let weights = await getWeight();
    let engineInfo = await getEngineInfo();
    
    let selectedM = req.body.material;
    let selectedP = req.body.price;
    let selectedW = req.body.weight;
    
    if(displays.length != 0) {
        console.log(displays);
        
        var copyOfDisplays = [...displays];
        var copyOfValues = [...req.body.name];
        
        var price = [0];
        
        // console.log(copyOfDisplays[0].length);
        // console.log(copyOfDisplays.length);
        
        for(var k = 0; k < copyOfDisplays.length; k++) {
            if(copyOfValues[k] != 0) {
                price[0] += engineInfo[copyOfDisplays[k]].engineCost * copyOfValues[k];
            }
        }
        
        // console.log(price[0]);
        
        var copyOfPrice = [...price];
        totalPrice[0] += copyOfPrice[0];
        
        // console.log(copyOfPrice[0]);
        // console.log(totalPrice[0]);

        valuesEntered.push(copyOfValues);
        positionEntered.push(copyOfDisplays);
        prices.push(copyOfPrice);
        // console.log(valuesEntered);
        // console.log(positionEntered);
        console.log(prices);
        
    }
    
    
    if(displays.length == 0) {
        if( (selectedM == "") && (selectedP == "") && (selectedW == "") ) {
            for(var a = 0; a < engineInfo.length; a++) {
                displays.push(a);
            }
        } else if ( (selectedM == "") && (selectedP == "") ) {
            for(var b = 0; b < engineInfo.length; b++) {
                if(engineInfo[b].weight == selectedW) {
                    displays.push(b);
                }
            }
        } else if ( (selectedM == "") && (selectedW == "") ) {
            for(var c = 0; c < engineInfo.length; c++) {
                if(engineInfo[c].engineCost == selectedP) {
                    displays.push(c);
                }
            }
        } else if ( (selectedP == "") && (selectedW == "") ) {
            for(var d = 0; d < engineInfo.length; d++) {
                if(engineInfo[d].material == selectedM) {
                    displays.push(d);
                }
            }
        } else if (selectedM == "") {
            for(var e = 0; e < engineInfo.length; e++) {
                if(engineInfo[e].engineCost == selectedP && engineInfo[e].weight == selectedW) {
                    displays.push(e);
                }
            }
        } else if (selectedP == "") {
            for(var f = 0; f < engineInfo.length; f++) {
                if(engineInfo[f].material == selectedM && engineInfo[f].weight == selectedW) {
                    displays.push(f);
                }
            }
        } else if (selectedW == "") {
            for(var g = 0; g < engineInfo.length; g++) {
                if(engineInfo[g].material == selectedM && engineInfo[g].engineCost == selectedP) {
                    displays.push(g);
                }
            }
        }
    }

    // console.log(displays);
    
    res.render("build", {
        "materials": materials,
        "prices": enginePrice,
        "weights": weights,
        "engineINFO": engineInfo,
        "displaying": displays
    });
    
});//buildShip

function getEngineInfo() {
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = `SELECT * 
                       FROM engine`;
        
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                // res.send(rows);
                conn.end();
                resolve(rows);
            });//query
        });//connect
    });//Promise
    
}//getEngineInfo

function getMaterials() {
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = `SELECT DISTINCT material
                       FROM engine 
                       ORDER BY material`;
        
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                // res.send(rows);
                conn.end();
                resolve(rows);
            });//query
        });//connect
    });//Promise
    
}//getMaterials

function getEnginePrice() {
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = `SELECT DISTINCT engineCost
                       FROM engine
                       ORDER BY engineCost`;
        
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                // res.send(rows);
                conn.end();
                resolve(rows);
            });//query
        });//connect
    });//Promise
    
}//getEnginePrice

function getWeight() {
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = `SELECT DISTINCT weight
                       FROM engine
                       ORDER BY weight`;
        
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                // res.send(rows);
                conn.end();
                resolve(rows);
            });//query
        });//connect
    });//Promise
    
}//getWeight

app.get("/shopcart", async function(req, res){
    
    let engineInfo = await getEngineInfo();
    
    res.render("cart", {
        "position": positionEntered,
        "amount": valuesEntered,
        "engineTP": prices,
        "total": totalPrice,
        "engineI": engineInfo
    });
    
});//logout


app.get("/addItem", function(req,res){
    res.render("addItem");
});//add item

app.post("/addItem", async function(req, res){
    //console.log(req.body);
    let rows = await insertItem(req.body);
    let message = "Item was NOT added to the system";
    if(rows.affectedRows > 0){
        message = "Item was added to the system";
    }
    
    res.render("addItem", {"message":message});
});//add item post

app.get("/updateItem", async function(req,res){
    
    let itemInfo = await getItemInfo(req.query.engineId);
    console.log(itemInfo);
    res.render("updateItem", {"itemInfo":itemInfo});
});//update item

app.post("/updateItem", async function(req,res){
    console.log(req.body);
    let rows = await updateItem(req.body);
    let itemInfo = req.body;
    let message = "Item was NOT updated";
    if(rows.affectedRows > 0){
        message = "Item was updated successfully";
    }
    res.render("updateItem", {"message":message, "itemInfo": itemInfo});
});//update item post

app.get("/deleteItem", async function(req,res){
    let rows = await deleteItem(req.query.engineId);
    
    let message = "Item was NOT deleted from the database";
    if(rows.affectedRows > 0){
        message = "Item deleted successfully";
    }
    console.log(message);
    let itemList = await getItemList();
    res.render("admin", {"itemList":itemList});
});//delete item

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
function dbConnection(){

    let conn = mysql.createConnection({
        host: "cst336db.space",
        user: "cst336_dbUser5",
        password: "clmxkg",
        database:"cst336_db5"
    });//createConnection

    return conn;
}

//running server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});


function getItemList(){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw(err);
            console.log("Connected!");
            
            let sql = `SELECT upgrade, engineId FROM engine ORDER BY upgrade`;
            
            conn.query(sql, function(err, rows, fields){
                if(err) throw(err);
                conn.end();
                resolve(rows);
            });//connect
        });//connect
    });//promise
}


function insertItem(body){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw(err);
            console.log("Connected!");
            
            let sql = `INSERT INTO engine
                        (upgrade, engineCost, description, weight, material, payloadReq)
                        VALUES (?,?,?,?,?,?)`;
            
            let params = [body.engine, body.cost, body.description, 
                        body.weight, body.material, body.payload];
            
            console.log(params);
            
            conn.query(sql, params, function(err, rows, fields){
                if(err) throw(err);
                conn.end()
                resolve(rows);
            })//connect
        })//connect
    })//promise
}

function updateItem(body){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw(err);
            console.log("Connected!");
            
            let sql = `UPDATE engine
                        SET upgrade = ?, engineCost = ?, description = ?, weight = ?,
                        material = ?, payloadReq = ?
                        WHERE engineId = ?`;
            
            let params = [body.engine, body.cost, body.description, 
                        body.weight, body.material, body.payload, body.engineId];
            
            conn.query(sql, params, function(err, rows, fields){
                if(err) throw(err);
                conn.end()
                resolve(rows);
            })//connect
        })//connect
    })//promise
}

function getItemInfo(engineId){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw(err);
            console.log("Connected!");
            
            let sql = `SELECT * FROM engine WHERE engineId = ?`;
            
            conn.query(sql, [engineId], function(err, rows, fields){
                if(err) throw(err);
                conn.end()
                resolve(rows[0]);
            })//connect
        })//connect
    })//promise
}

function deleteItem(engineId){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw(err);
            console.log("Connected!");
            
            let sql = `DELETE FROM engine WHERE engineId = ?`;
            
            conn.query(sql, [engineId], function(err, rows, fields){
                if(err) throw(err);
                conn.end()
                resolve(rows);
            })//connect
        })//connect
    })//promise
}

