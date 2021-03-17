const request = require('request')
const emojis = require('emojis-list')
const punycode = require('punycode')

function isJson(str) {
try {
    JSON.parse(str);
} catch (e) {
    return false;
}
return true;
}

const checkIfWSDomainIsAvailable = emoji => {
  const url = 'http://samoanic.ws/whois.dhtml'
  const options = {
    url,
    form: {domain: `xn--${punycode.encode(emoji)}`, tld: 'WS'}
  }

  request.post(options, (error, response, body) => {
    if (error) {
      console.log(`Error checking ${emoji} .ws domain`)
      return
    }

    if (body.toLowerCase().includes('congratulations')) {
      console.log(`${emoji} .ws is available`)
    }
  })
}

const checkIfDomainsAreAvailable = emoji => {
  const url = 'https://my.freenom.com/includes/domains/fn-available.php'
  const options = {
    url,
    form: {domain: `xn--${punycode.encode(emoji)}`, tld: ''}
  }

  request.post(options, (error, response, body) => {
    if (error) {
      console.log(`Error checking ${emoji}  domain`)
      return
    }

    if(isJson(body)) {
      const bodyObj = JSON.parse(body)
      bodyObj.free_domains.forEach(domain => {
        if (domain.status === 'AVAILABLE') {
          console.log(`${emoji} ${domain.tld} is available`)
        }
      })
    }


  })
}

emojis.forEach(emoji => {
  checkIfDomainsAreAvailable(emoji)
  checkIfWSDomainIsAvailable(emoji)
})
