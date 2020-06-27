exports.seed = function(knex) {
  return knex('comments').del()
    .then(function () {
      return knex('users').del();
    });
};
