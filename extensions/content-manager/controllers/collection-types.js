'use strict';

const shortUrlService = require('../../short-url-service');
const original = require('strapi-plugin-content-manager/controllers/collection-types')

module.exports = {
  async create(ctx) {
    if (ctx.params.model.indexOf('post') > -1) {
      const body = ctx.request.body
      body.short_url = await shortUrlService.shortUrl(body.url)
    }
    await original.create(ctx)
  }
};
