exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("data_file", function (table) {
            table.increments();
            table.string('key_name');
            table.string('file_name');
            table.integer('id_user');
            table.string('title_name');
            table.string('description');
            table.boolean('public_access').notNull().defaultTo(false);
            table.string('type');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("data_file")
    ]);
};
