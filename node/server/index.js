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
	var readdat = "SELECT username, prediction FROM datacollected WHERE username='"+req.body["username"]+"';";
	pool.query(readdat, function(err, result) {
	if(err) throw err;
	const arr = []
	for(let i = 0; i < result.length; i++) {
		arr.push(result[i]["prediction"]);
	}
	res.json(arr);
	console.log(arr);
	});
});
app.post("/ins_pred", (req, res) => {
	var inspred = "INSERT INTO datacollected(prediction) VALUES('"+req.body["prediction"]+"') WHERE username='"+req.body["username"]+"';";
	pool.query(inspred, function(err, result) {
	if(err) throw err;
	res.json(result[0]);
	console.log(result[0]);
	});
});
app.post("/rec_user", (req,res) => {
	var insrec = "INSERT INTO datacollected(username, recommendeduser) VALUES('"+req.body["username"]+"', '"+req.body["recommendeduser"]+"');";
	pool.query(insrec, function(err, result) {
	if(err) throw err;
	res.json({message: result[0]});
	console.log("inserted recommended user, recommendation for user");
	});
});
app.post("/rec_rec", (req, res) => {
	var recrec = "INSERT INTO datacollected(recommendation) VALUES('"+req.body["recommendation"]+"') WHERE username='"+req.body["username"]+"' AND recommendeduser='"+req.body["recommendeduser"]+"';";
	pool.query(recrec, function(err, result) {
	if(err) throw err;
	res.json({message: result[0]});
	console.log("inserted recommendation for recommended user");
	});
});
app.post("/get_recs", (req, res) => {
	var getrec = "SELECT recommendeduser, recommendation FROM datacollected WHERE username='"+req.body["username"]+"';";
	pool.query(getrec, function(err, result) {
	if(err) throw err;
	const arr = []
	console.log(result);
	for(let i = 0; i < result.length; i++) {
		if(result[i]["recommendation"] === "friendly"){
			arr.push({title: result[i]["recommendeduser"]});
	}
	}
	res.json(arr);
	console.log(arr);
	});
});
app.get("/check_match", (req, res) => {
	var check = "INSERT INTO friends(username, friendslist) SELECT x.username, x.pending FROM friends x, friends y WHERE x.username=y.pending AND y.username=x.pending AND x.pending!='' AND y.pending!='';";
	pool.query(check, function(err, result) {
	if(err) throw err;
	if(check)
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
app.post("/get_friends", (req,res) => {
	var get = "SELECT friendslist FROM friends WHERE username='"+req.body["username"]+"' AND friendslist!='';";
	pool.query(get, function(err, result) {
	if(err) throw err;
	const arr = [];
	console.log("Fetched");
	for(let i = 0; i < result.length; i++) {
		arr.push(result[i]["friendslist"]);	
	}
	res.json(arr);
	console.log(arr);
	});
});
app.get("/delete_pending", (req,res) => {
	var del = "DELETE x,y FROM friends x, friends y WHERE x.username IN(SELECT implicitTemp.username FROM (SELECT x.username WHERE x.username=y.pending AND y.username=x.pending AND x.pending!='' AND y.pending!='') implicitTemp);";
	pool.query(del, function(err, result) {
	if(err) throw err;
	console.log("Executed delete newly added friends from pending");
	});
});
app.post("/get_profile", (req,res) => {
	var get = "SELECT * FROM users WHERE username='"+req.body["username"]+"';";
	pool.query(get, function(err, result) {
	if(err) throw err;
	const arr = []
	console.log("Fetched profile");
	for(let i = 0; i < result.length; i++) {
		arr.push(result[i]);
	}
	res.json(arr);
	console.log(arr);
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
app.post("/check_if_user_exists", (req, res) => {
	var check = "SELECT username FROM users WHERE abt IS NOT NULL AND username='"+req.body["username"]+"';";
	pool.query(check, function(err, result) {
	if(err) throw err;	
	console.log(result);
	if(!result[0]) {
		console.log("user does not exist");
		res.json("user does not exist");
	} else{
		console.log(req.body.username);
		res.json(req.body.username);
	}
	});
});
app.post("/update_gps", (req, res) => {
	var gps = "UPDATE datacollected SET gps='"+req.body["gps"]+"' WHERE username='"+req.body["username"]+"';";
	pool.query(gps, function(err, result) {
	if(err) throw err;
	console.log("updated gps for" + result);
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

