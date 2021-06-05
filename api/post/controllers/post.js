'use strict';

module.exports = {
  async report(ctx) {
    return stringify(await find(ctx), ctx.request.query.issue_no);
  }
};

async function find(ctx) {
  let entities;
  if (ctx.query._q) {
    entities = await strapi.services.post.search(ctx.query);
  } else {
    entities = await strapi.services.post.find(ctx.query);
  }
  return entities;
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
