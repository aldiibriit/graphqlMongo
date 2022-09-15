const articleResolver = require('./article');
const commentResolver = require('./comment');

const rootResolver = {
  ...articleResolver,
  ...commentResolver
};

module.exports = rootResolver;
