const request = require('request');
const emojis = require('emojis-list');
const punycode = require('punycode');

const checkIfEmojiDomainIsAvailable = emoji => {
  const url = 'http://samoanic.ws/whois.dhtml';
  const options = {
    url,
    form: {domain: `xn--${punycode.encode(emoji)}`, tld: 'WS'}
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.log(`Error checking ${emoji} .ws domain`);
      return;
    }

    if (body.toLowerCase().includes('congratulations')) {
      console.log(`${emoji} .ws is available`);
    }
  });
};

emojis.forEach(emoji => {
  checkIfEmojiDomainIsAvailable(emoji);
})
