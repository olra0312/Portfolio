exports.up = function(knex) {
  return knex.schema
      .createTable('users', table => {
          table.increments('id');
          table.string('username').unique().notNullable();
          table.string('password').notNullable();

          table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
          table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('comments', table => {
        table.increments('id');
        table.string('comment').notNullable();

        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');

        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('created_at').defaultTo(knex.fn.now());

      });
};


exports.down = function(knex) {
return knex.schema
  .dropTableIfExists('comments')
  .dropTableIfExists('users');
};