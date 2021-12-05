AWS = require('aws-sdk');

var path = require('path');
// Set the region 
AWS.config.update({
	  region: 'us-east-2',
	  accessKeyId: 'AKIAVIP7TA4Q6QKWKUCK',
	  secretAccessKey: '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',
	
});
// Create S3 service object
var s3 = new AWS.S3();
var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
var localupload = process.argv[3];
var fs = require('fs');
if(process.argv[4] == 1){
	console.log("option 1, uploading file")
	var fileStream = fs.createReadStream(localupload);
	fileStream.on('error',function(err) {
		console.log('File error', err);
	});
	
	uploadParams.Body = fileStream;
	var path = require('path');
	uploadParams.Key = path.basename(localupload);

	s3.upload(uploadParams, function(err, data) {
		if(err) {
			console.log('Error',err);
		} if (data) {
			console.log('Upload success', data.Location);
		}
	});
}
if(process.argv[4] == 0){
	console.log("option 2, uploading directory")
	fs.readdir(localupload, (err, files) => {
		files.forEach(file => {
		  console.log(file);
		  const coolpath = path.join(localupload, file);
		  var fileStream = fs.createReadStream(coolpath);
		  fileStream.on('error',function(err) {
		  console.log('File error', err);
		  });

		  uploadParams.Body = fileStream;
		  uploadParams.Key = path.basename(localupload);

		  s3.upload(uploadParams, function(err, data) {
		  if(err) {
			  console.log('Error',err);
		  }if (data) {
			  console.log('Upload success', data.Location, coolpath);
		    }
		   });
		});
	});
}		
	

