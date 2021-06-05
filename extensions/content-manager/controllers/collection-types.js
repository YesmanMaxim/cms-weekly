'use strict';

const axios = require('axios')
const original = require('strapi-plugin-content-manager/controllers/collection-types')

module.exports = {
  async create(ctx) {
    if (ctx.params.model.indexOf('post') > -1) {
      const body = ctx.request.body
      body.short_url = await shortUrl(body.url)
    }
    await original.create(ctx)
  }
};

function shortUrl(longUrl) {
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
