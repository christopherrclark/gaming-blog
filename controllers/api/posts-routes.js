const router = require('express').Router();
const { Post, Comment } = require('../../models');

//Get all posts
router.get('/', async (req, res) => {
    try {
        const getPostData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    //I want to view these specific details
                    attributes: ['id', 'user_id', 'post_id', 'post_date', 'post_content']
                }
            ]
        });

        res.json(getPostData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Get a specific post
router.get('/:id' , async (req, res) => {
    let postId = req.params.id;
    try {
        const getSpecificPost = await Post.findOne({ where: { id: postId }})
        if (!getSpecificPost) {
            res.status(404).send("Sorry, post was not found!")
        } else {
            res.json(getSpecificPost)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Create a post
router.post('/', async (req, res) => {
    try {
        let createPost = await Post.create({
            post_date: req.body.post_date,
            post_text: req.body.post_content,
            post_title: req.body.post_title,
            user_id: req.session.user.user_id
        })
        res.status(201).send(createPost)
        console.log(createPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//Update a post
router.put('/:id', async (req, res) => {
    let postId = req.params.id;

    try {
        let postToUpdate = await Post.Update({
            post_title: req.body.post_title,
            post_content: req.body.post_content
        }, 
        { where: { id: postId }})

        if (!postToUpdate) {
            res.status(404).json({message: "Post not found!"})
            return;
        } else {
            res.status(204).send("Post updated successfully")
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Delete a post
router.delete('/:id', async (req, res) => {
    let postId = parseInt(req.params.id)

    try {
        await Comment.destroy({ where: { post_id: postId } });

        let postToDelete = await Post.destroy({ where: { id: postId }});

        if (!postToDelete) {
            res.status(404).send("Sorry, no post found!")
        } else {
            res.json(postToDelete);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
