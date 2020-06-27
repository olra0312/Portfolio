exports.seed = function(knex) {
  return knex('users').select().then(users => {
    if (users.length >= 2) {
      return knex('comments').insert([
      
      ]);
    }
  });

};
