const mysql =  require('mysql');

const con = mysql.createConnection({
    host: "wo-of.cw6gdxo3gqxo.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "monmon10!"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected to MySQL server endpoint wo-of!");
    var selectdatabase = "USE woof;"
    con.query(selectdatabase, function(err, result) {
        if (err) throw err;
        console.log("database woof selected");
    });

    var users = "CREATE TABLE if not exists users (userid VARCHAR(255) PRIMARY KEY, fullname VARCHAR(255), dob DATE, email VARCHAR(255), password VARCHAR(255), dogname VARCHAR(255), datejoined DATETIME);";
    con.query(users, function(err, result) {
        if (err) throw err;
        console.log("users table created");
    });
    /*
    var encryptioncert = "CREATE CERTIFICATE Password;"
    con.query(encryptioncert, function(err, result) {
        if (err) throw err;
        console.log("users table created");
    });

    var encryptionkey = "CREATE SYMMETRIC KEY PSWD_Key WITH ALGORITHM = AES_256 ENCRYPTION BY CERTIFICATE Passwords;"
    con.query(encryptionkey, function(err, result) {
        if (err) throw err;
        console.log("users table created");
    });

    var addencryptedfield = "ALTER TABLE woof.users ADD Encryptedpassword varbinary(255);"
    con.query(addencryptedfield, function(err, result) {
        if (err) throw err;
        console.log("users table created");
    });

    var readkey = "OPEN SYMMETRIC KEY PSWD_Key DECRYPTION BY CERTIFICATE Password;"
    con.query(readkey, function(err, result) {
        if (err) throw err;
        console.log("users table created");
    });

    var encryptpassword = "UPDATE woof.users SET Encryptedpassword = EncryptByKey(Key_GUID('PSWD_Key'), password);"
    con.query(encryptpassword, function(err, result) {
        if (err) throw err;
        console.log("users table created");
    });

    var readkey = "OPEN SYMMETRIC KEY PSWD_Key DECRYPTION BY CERTIFICATE Password;"
    con.query(readkey, function(err, result) {
        if (err) throw err;
        console.log("users table created");
    });

    var decrypt = "SELECT password, Encryptedpassword CONVERT(nvarchar, DecryptByKey(Encryptedpassword));"
    con.query(decrypt, function(err, result) {
        if (err) throw err;
        console.log("users table created");
    });
    */

    var friends = "CREATE TABLE if not exists friends (userid VARCHAR(255), friendslist VARCHAR(255),  CONSTRAINT uidorder FOREIGN KEY (userid) REFERENCES users(userid));";
    con.query(friends, function(err, result) {
        if (err) throw err;
        console.log("friends table created");
    });

    var devices = "CREATE TABLE if not exists devices (deviceid VARCHAR(255) PRIMARY KEY, userid VARCHAR(255), macaddr VARCHAR(255), datepurchased DATE, swversion VARCHAR(255), firmwareversion VARCHAR(255), CONSTRAINT uidorder2 FOREIGN KEY (userid) REFERENCES users(userid));";
    con.query(devices, function(err, result) {
        if (err) throw err;
        console.log("devices table created");
    });

    var datacollected = "CREATE TABLE if not exists datacollected (deviceid VARCHAR(255), userid VARCHAR(255), accelerometer VARCHAR(255), microphone VARCHAR(255), gps VARCHAR(255), CONSTRAINT uidorder3 FOREIGN KEY (userid) REFERENCES users(userid), CONSTRAINT deviceorder FOREIGN KEY (deviceid) REFERENCES devices(deviceid));";
    con.query(datacollected, function(err, result) {
        if (err) throw err;
        console.log("datacollected table created");
    });

    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);
    console.log(date)

    let stmt = `INSERT INTO accelerometer(timeread,x,y,z)  VALUES ?  `;
    let todos = [
        ['2022-01-31 22:34:37', 10,10,10],
        ['2022-01-31 22:34:38', 10,10,10],
        ['2022-01-31 22:34:39', 10,10,10],
        ['2022-01-31 22:34:40', 10,10,10],
        ['2022-01-31 22:34:41', 10,10,10]
    ];

    // execute the insert statment
    con.query(stmt, [todos], (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
    // get inserted rows
    console.log('Row inserted:' + results.affectedRows);
    });
    
    con.end();
});