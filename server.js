//setting up an express server.

//load express
const express = require('express');
//load multer
const multer = require('multer');
const app = express();
const path = require('path');
// const fs = require('fs');


//mysql stuff
mysql = require('mysql')
bodyParser = require("body-parser");
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass123!',
  database : 'images_db'
});

connection.connect();
 
global.db = connection;

//endf of mysql stuff
const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },  
});

const limits = {
    fileSize : 4000000
}

//fileFilter function controls which files should be uploaded. req = request being made. file = contains file info. cb = callback function to tell multer when we are done filtering the file. send back an error message to the client with cb.
const fileFilter =(req, file, cb) => {
  //if the file is not a jpg, jpeg, or png file, do not upload it multer; reject it.
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File must be of type JPG, JPEG, or PNG and nore more than 2MB in size'))
  }
  //undefined = nothing went wrong; true = that is true, nothing went wrong, accept the upload.
  cb(undefined, true)
}

//set up the multer middleware
const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
    // filename: filename
  })

// ROUTES
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
  });

  //app.use('/image', express.static('./upload')); // shared uploaded folder with users so users can access the profile images though image folder path


//upload image post route: localhost:port/upload
  app.post("/upload",upload.single('upload'), (req, res) => {
 

    // res.send();
    //mysql stuff
    // var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";
    let sql = "INSERT INTO `file`(`name`) VALUES (?)";
 
    db.query(sql, [req.file.filename], function(err, result) {
       console.log('inserted data');
    });
    message = "Successfully! uploaded";
    //res.render('index',{message: message, status:'success'});
    //end of mysql stuff
     
    res.redirect('./');
   
}), (error, req, res, next) => {
    res.status(400).res.send("You have successfully uploaded the file!");
    // res.redirect('/');
}



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})