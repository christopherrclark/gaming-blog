const Post = require('../models/Post');

const postsSeeds = [
    //Bob's post
    {
        user_id: 2, 
        post_date: "01/01/2022",
        post_title: "GTA V is the best game ever!",
        post_content: "The driving is much easier than GTA 4."
    },
    //Jason's post
    {
        user_id: 1, 
        post_date: "01/01/2022",
        post_title: "Doom still reigns Supreme!",
        post_content: "What more can I say about this game in all honesty?"
    },
];

const seedPosts = () => Post.bulkCreate(postsSeeds);

module.exports = seedPosts;