const express = require("express");
const bp = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("mysql");

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

let pool = db.createConnection({
	host: "woof.cm3lizor7esf.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "monmon10!",
	database: "woof"
});

pool.connect(function(err) {
if (err) throw err;
});

app.get("/api", (req,res) => {
	res.json({message: "Hello from server!"});
});

app.post("/receive_classification", (req, res) => {
	console.log("Connected to MySQL");
	var readdat = "SELECT username, prediction FROM datacollected WHERE username='"+req.body["dogname"]+"';";
	pool.query(readdat, function(err, result) {
	if(err) throw err;
	res.json({message: result[0]["prediction"]});
	});
});
app.get("/check_match", (req, res) => {
	var check = "INSERT INTO friends(username, friendslist) SELECT x.username, x.pending FROM friends x, friends y WHERE x.username=y.pending AND y.username=x.pending AND x.pending!='' AND y.pending!='';";
	pool.query(check, function(err, result) {
	if(err) throw err;
	res.json({message: result[0]});
	});
});
app.post("/friends", (req,res) => {
	res.json({friends: res.body});
	console.log(req.body);
	var add = "INSERT INTO friends(username,  pending) VALUES('"+req.body["username"]+"', '"+req.body["pending"]+"');";
	pool.query(add, function(err, result) {
	if(err) throw err;
	console.log("Inserted");
	});
});
app.post("/classification", (req, res) => {
	res.json({classification: res.body});
	console.log(req.body);
	console.log("Connected to MySQL");
	var insdata = "INSERT INTO datacollected(username, x, y, z, microphone, gps, prediction) VALUES('"+req.body["username"]+"','"+req.body["x"]+"', '"+req.body["y"]+"', '"+req.body["z"]+"', '"+req.body["microphone"]+"', '"+req.body["gps"]+"', '"+req.body["prediction"]+"');";
	pool.query(insdata, function(err, result) {
	if(err) throw err;
	console.log("inserted");
	});
});
app.post("/profile",(req,res) => {
	res.send({message: "Received profile information. Thanks!"});
	console.log(req.body);
	console.log("Connected to MySQL");
	var insusers = "INSERT INTO users(userid,username,  fullname, dob, pronouns,  email,  dogname, dogbreed, abt,  datejoined) VALUES('"+req.body["userid"]+"','"+req.body["username"]+"', '"+req.body["fullname"]+"', '"+req.body["dob"]+"','"+req.body["pronouns"]+"',  '"+req.body["email"]+"', '"+req.body["dogname"]+"', '"+req.body["dogbreed"]+"', '"+req.body["abt"]+"', CURDATE());";
	pool.query(insusers, function(err, result) {
	if(err) throw err;
	console.log("inserted");
	});
});

app.listen(PORT, () => {
	console.log('Server listenining on port 3000');
});


//pool.connect(function(err) {
//	if(err) throw err;
//	console.log("Connected to MySQL server endpoint woofs!");
//	var insusers = "INSERT INTO users(userid, fullname) VALUES(userid,'Chase Maivald');";
//	pool.query(insusers, function(err, result) {
//	if (err) throw err;	
//	console.log("inserted a row into users");
//});
//pool.end();
//});

