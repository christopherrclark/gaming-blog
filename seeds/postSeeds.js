const Post = require('../models/Post');

const postsSeeds = [
    //Bob's post
    {
        user_id: 2, 
        post_date: "01/01/2022",
        post_title: "Bob's post title!",
        post_content: "This is the body of Bob's post!!"
    },
    //Jason's post
    {
        user_id: 1, 
        post_date: "01/01/2022",
        post_title: "Jason's post title!",
        post_content: "This is the body of Jason's post!!"
    },
];

const seedPosts = () => Post.bulkCreate(postsSeeds);

module.exports = seedPosts;