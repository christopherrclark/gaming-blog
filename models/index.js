const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');


//Associations

//COMMENTS
Comment.belongsTo(User, { foreignKey: 'user_id'});

Comment.belongsTo(Post, { foreignKey: 'post_id'});

//POSTS
Post.belongsTo(User, { foreignKey: 'user_id'});

Post.hasMany(Comment, { foreignKey: 'post_id'});

//USERS
User.hasMany(Comment, { foreignKey: 'user_id'});

User.hasMany(Post, { foreignKey: 'user_id'})

module.exports = { Comment, Post, User };