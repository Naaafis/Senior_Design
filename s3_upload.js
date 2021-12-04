AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
	  region: 'us-east-2',
	  accessKeyId: 'AKIAVIP7TA4Q6QKWKUCK',
	  secretAccessKey: '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',
	
});
// Create S3 service object
var s3 = new AWS.S3();
var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
var file = process.argv[3];
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error',function(err) {
	console.log('File error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

s3.upload(uploadParams, function(err, data) {
	if(err) {
		console.log('Error',err);
	} if (data) {
		console.log('Upload success', data.Location);
	}
});

