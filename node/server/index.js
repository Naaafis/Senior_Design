const express = require("express");
const bp = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("mysql");

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

app.get("/api", (req,res) => {
	res.json({message: "Hello from server!"});
});
app.post("/classification", (req, res) => {
	res.json({classification: res.body});
	console.log(req.body);
	pool.connect(function(err) {
	if(err) throw err;
	console.log("Connected to MySQL");
	var insdata = "INSERT INTO datacollected( x, y, z, microphone, gps, prediction) VALUES('"+req.body["x"]+"', '"+req.body["y"]+"', '"+req.body["z"]+"', '"+req.body["microphone"]+"', '"+req.body["gps"]+"', '"+req.body["prediction"]+"');";
	pool.query(insdata, function(err, result) {
	if(err) throw err;
	console.log("inserted");
	});
});
});
app.post("/profile",(req,res) => {
	res.send({message: "Received profile information. Thanks!"});
	console.log(req.body);
	pool.connect(function(err) {
	if(err) throw err;
	console.log("Connected to MySQL");
	var insusers = "INSERT INTO users(userid, fullname, dob, email, password, dogname, dogbreed, abt,  datejoined) VALUES('"+req.body["userid"]+"', '"+req.body["fullname"]+"', '"+req.body["dob"]+"', '"+req.body["email"]+"', '"+req.body["password"]+"', '"+req.body["dogname"]+"', '"+req.body["dogbreed"]+"', '"+req.body["abt"]+"', '"+req.body["datejoined"]+"');";
	pool.query(insusers, function(err, result) {
	if(err) throw err;
	console.log("inserted");
	});
});
});

app.listen(PORT, () => {
	console.log('Server listenining on port 3000');
});

let pool = db.createConnection({
	host: "woofs.cm3lizor7esf.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "monmon10!",
	database: "woof"
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

