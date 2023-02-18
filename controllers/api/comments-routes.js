const router = require('express').Router();
const { Comment } = require('../../models');

//Get all comments
router.get('/', async (req, res) => {
    try {
        let getAllComments = await Comment.findAll({})
        res.json(getAllComments)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;