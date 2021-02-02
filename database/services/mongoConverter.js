var _ = require('lodash');

function convert(data) {
  if (Array.isArray(data)) {
    return _.map(data, function (elem) {
      return convert(elem);
    });
  }
  data = data.toObject({getters: true, versionKey: false});
//   if (data.userId) {
//     delete data.userId;
//   }
//   delete data._id;
  return data;
}

module.exports = { convert }