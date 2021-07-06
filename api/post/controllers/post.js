'use strict';

const shortUrlService = require('../../../extensions/short-url-service');

module.exports = {
  async report(ctx) {
    return stringify(await find(ctx), ctx.request.query.issue_no);
  },
  async issues(ctx) {
    return aggregateIssues(await find(ctx));
  },
  async customCreate(ctx) {
    try {
      preProcessBody(ctx.request.body);
      return await strapi.controllers.post.create(ctx);
    } catch (error) {
      console.log(error)
      throw error.message ? strapi.errors.badRequest(error.message) : error
    }
  }
};

function preProcessBody(body) {
  body.issue_no = 1000
  body.published_at = null
  body.short_url = shortUrlService.shortUrl(body.url)
}

async function find(ctx) {
  let entities;
  if (ctx.query._q) {
    entities = await strapi.services.post.search(ctx.query);
  } else {
    entities = await strapi.services.post.find(ctx.query);
  }
  return entities;
}

const MAXIMUM_ISSUES = 900

function aggregateIssues(entities) {
  return [...new Set(entities.map(entity => entity.issue_no).filter(issue => issue < MAXIMUM_ISSUES))]
}

function stringify(entities, issue) {
  return [
    `# **Tech Weekly. Issue #${issue}**`,
    '\n\n',
    entities.map(entity => stringifyEntity(entity)).join(''),
  ].join('')
}

function stringifyEntity(entity) {
  return `
### [${entity.title}](${entity.short_url})
> _${entity.description.trim()}_
`;
}
