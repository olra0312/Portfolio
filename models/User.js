const { Model } = require('objection');

const Comment = require('./Comments.js');

class User extends Model {
    static tableName = 'users';

    static relationMappings = {
        electives: {
            relation: Model.HasManyRelation,
            modelClass: Comment,
            join: {
              from: 'users.id',
              to: 'comments.userId'
            }
        }
    }
}

module.exports = User;
