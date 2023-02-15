const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');


//Associations

//COMMENTS
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(Post);

//POSTS
Post.belongsTo(User);
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

//USERS
User.hasMany(Comment);
User.hasMany(Post);

module.exports = { Comment, Post, User };