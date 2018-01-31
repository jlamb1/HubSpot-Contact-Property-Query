const http = require('http');
const prompt = require('prompt');
prompt.start();

prompt.get(['email', 'api_key', 'value'], (err, result) => {
    const url = `http://api.hubapi.com/contacts/v1/contact/email/${result.email}/profile?hapikey=${result.api_key}`;
    http.get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', () => {
            let searchedProperty = JSON.parse(body).properties[result.value].value;
            console.log(searchedProperty);
        });
    }).on('error', function (e) { console.log("Got an error: ", e); });
});