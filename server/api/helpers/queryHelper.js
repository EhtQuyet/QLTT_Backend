import queryToMongo from 'query-to-mongo';

function extractQueryParam(req, searchLikes, lean = true, is_deleted = false) {
  const queryParam = req.query;
  const query = queryToMongo(queryParam, {
    ignore: ['page'],
  });
  const criteria = query.criteria;

  if (searchLikes && searchLikes.length > 0) {
    searchLikes.forEach(fieldName => {
      if (criteria[fieldName] !== undefined) {
        criteria[fieldName] = new RegExp(criteria[fieldName], 'i');
      }
    });
  }

  criteria.is_deleted = is_deleted;
  const options = query.options;
  options.lean = lean;
  if (queryParam.limit && queryParam.limit === '0') {
    options.pagination = false;
  }
  if (queryParam.limit === undefined) {
    options.limit = 10;
  }
  options.page = queryParam.page || 1;
  return query;
}

export default {
  extractQueryParam,
};
