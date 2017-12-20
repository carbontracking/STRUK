
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('data_file', function(table){
      table.string('upscribers_ref');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('data_file', function(table){
      table.dropColumn('upscribers_ref');
    })
  ])
};
