const request = require('request');
const smsConfig = require('../config/sms');
const {URL} = smsConfig;

class SMS {
    send(mobile,message){
        if(!mobile) throw new Error('mobile number is required');
        if(!message) throw new Error('SMS message cannot be empty')
        const apiUrl = URL.replace('{{mobile}}',mobile).replace("{{message}}",message);
        request(apiUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Print the google web page.
             }
        })
    }
}

module.exports = new SMS();