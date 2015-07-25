console.log('Loading function');

var aws = require('aws-sdk');
var request = require('superagent');
var s3 = new aws.S3({ apiVersion: '2006-03-01' });
var config = require('./config')


exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
		var region = event.Records[0].awsRegion;
    var bucket = event.Records[0].s3.bucket.name;
    var key = event.Records[0].s3.object.key;

		var notifyUrl = config.notifyUrl;

		// Define data that you want to send to the other side
		var objectPublicUrl = 'https://s3-'+ region + '.' + 'amazonaws.com/' + bucket + '/' + key;
		var data = {
			status: 'success',
			data: {
				publicUrl : objectPublicUrl,
				metadata : event.Records[0]
			}
		}

		// Log to AWS before sending for debuggin purpose
		console.log('Sending to ', notifyUrl, ' data ', data);

		request.post(notifyUrl)
	    .set('Content-Type', 'application/json')
	    .send(data)
	    .end()

};
