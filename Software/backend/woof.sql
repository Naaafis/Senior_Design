CREATE DATABASE if not exists woof;
USE woof;
CREATE TABLE if not exists users (userid VARCHAR(255) PRIMARY KEY, fullname VARCHAR(255), dob DATE, email VARCHAR(255), password VARCHAR(255), dogname VARCHAR(255), dogbreed VARCHAR(255), about VARCHAR(255), datejoined DATETIME);
CREATE TABLE if not exists friends (userid VARCHAR(255), friendslist VARCHAR(255),  CONSTRAINT uidorder FOREIGN KEY (userid) REFERENCES users(userid));
CREATE TABLE if not exists devices (deviceid VARCHAR(255) PRIMARY KEY, userid VARCHAR(255), macaddr VARCHAR(255), datepurchased DATE, swversion VARCHAR(255), firmwareversion VARCHAR(255), CONSTRAINT uidorder2 FOREIGN KEY (userid) REFERENCES users(userid));
CREATE TABLE if not exists datacollected (deviceid VARCHAR(255), userid VARCHAR(255), x VARCHAR(255), y VARCHAR(255), z VARCHAR(255), microphone VARCHAR(255), gps VARCHAR(255), CONSTRAINT uidorder3 FOREIGN KEY (userid) REFERENCES users(userid), CONSTRAINT deviceorder FOREIGN KEY (deviceid) REFERENCES devices(deviceid));
SELECT * FROM users;