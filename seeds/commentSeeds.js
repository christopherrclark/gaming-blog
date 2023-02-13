const Comment = require('../models/Comment');

const commentSeeds = [
    //Bob's comment
    {
        user_id: 1,
        post_id: 1,
        comment_date: "01/01/2022",
        comment_content: "This website makes trees happy!"
    },
    //Jason's Comment
    {
        user_id: 2,
        post_id: 1,
        comment_date: "01/01/2022",
        comment_content: "I love this new website is Awesome!"
    }
];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;