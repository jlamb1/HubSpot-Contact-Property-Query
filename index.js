require('dotenv').config()
const http = require('http')
const prompt = require('prompt')

prompt.start()

prompt.get(['email', 'value'], (err, result) => {
  if (err) {
    console.log(err)
  }
  const url = `http://api.hubapi.com/contacts/v1/contact/email/${result.email}/profile?hapikey=${process.env.HAPI_KEY}`
  http.get(url, (res) => {
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })
    res.on('end', () => {
      const searchedProperty = JSON.parse(body).properties[result.value].value
      console.log(searchedProperty)
    })
  }).on('error', (e) => { console.log(`Got an error: ${e}`) })
})
