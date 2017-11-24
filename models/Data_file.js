var bookshelf = require('../config/bookshelf');
var moment = require('moment');

var Data_file = bookshelf.Model.extend({
  tableName: 'data_file',
  hasTimestamps: true,
  toJSON: function () {
    var attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
    moment.locale('fr');
    attrs.displayDate = moment(this.get('created_at')).format('L');
    return attrs;
  }
});

module.exports = Data_file;