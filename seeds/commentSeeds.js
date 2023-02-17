const Comment = require('../models/Comment');

const commentSeeds = [
    //Bob's comment
    {
        user_id: 2,
        post_id: 2,
        comment_date: "01/01/2022",
        comment_content: "Sure Doom is cool!"
    },
    //Jason's Comment
    {
        user_id: 1,
        post_id: 1,
        comment_date: "01/01/2022",
        comment_content: "Although GTA V is a great game!"
    }
];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;