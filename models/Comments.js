const { Model } = require('objection');

const User = require('./User.js');

class Comment extends Model {
    static tableName = 'comments';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'comments.userId',
              to: 'users.id'
            }
        }
    }
}

module.exports = Comment;
