'use strict';

const axios = require('axios')
module.exports = {
  shortUrl(longUrl) {
    const headers = {
      'Authorization': `Bearer ${strapi.config.get('server.bitly.token')}`,
      'Content-Type': 'application/json',
    }
    return axios
      .post(strapi.config.get('server.bitly.url'), {long_url: longUrl}, {headers: headers})
      .then(res => res.data.link)
      .catch(error => {
        console.error(error)
      })
  }
}
