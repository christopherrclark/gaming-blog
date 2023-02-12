const Comment = require('../models/Comment');

const commentSeeds = [
    //Clays comment
    {
        user_id: 1,
        post_id: 1,
        comment_date: "01/01/2022",
        comment_content: "This is Clay's comment!"
    },
    //Mikes Comment
    {
        user_id: 2,
        post_id: 2,
        comment_date: "01/01/2022",
        comment_content: "This is Mike's comment!"
    }
];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;