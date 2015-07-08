# This is chatty-s3
A lambda script to notify external web hooks when an s3 bucket getting some
action or changes

## How to use
copy sample config file `config.sample.js` to `config.js`
Replace the `notifyUrl` path with your path
```javascript
module.exports = {
	notifyUrl: 'https://sample-url/sample-path'
}
```

Notification method use `POST` method
