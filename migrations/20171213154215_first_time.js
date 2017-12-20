exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('data_file', function(table){
      table.boolean('first_time').notNull().defaultTo(true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('data_file', function(table){
      table.dropColumn('first_time');
    })
  ]);
};
