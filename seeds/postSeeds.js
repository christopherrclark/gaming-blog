const Post = require('../models/Post');

const postsSeeds = [
    //Clay's post
    {
        user_id: 1, 
        post_date: "01/01/2022",
        post_title: "Clay's post title!",
        post_content: "This is the body of Clay's post!!"
    },
    //Mike's post
    {
        user_id: 2, 
        post_date: "01/01/2022",
        post_title: "Mike's post title!",
        post_content: "This is the body of Mike's post!!"
    },
];

const seedPosts = () => Post.bulkCreate(postsSeeds);

module.exports = seedPosts;