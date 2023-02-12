const router = require('express').Router();
const express = require('express');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


//    /dashboard
//The same as the home page, but only accessible to logged in users
router.get('/', withAuth, async (req, res) => {
    console.log(req.session.logged_in)
    try {
        let findAllPosts = await Post.findAll({ where: {
            user_id: req.session.user_id
        },
        include: [{ model: Comment }, { model: User }]
        });

        const posts = findAllPosts.map((post) => post.get({ plain: true }))
        res.render('dashboard', { 
            posts, 
            logged_in: true 
        })
    } catch {
        console.log(err);
        res.status(500).json(err);
    }
});

//Separate page to edit the selected post
router.get('/edit/:id', withAuth, async (req, res) => {
    let getPost = req.params.id;
    console.log(req.session.logged_in)
    try {
        let updatePost = await Post.findOne({ 
            where: { 
                id: getPost 
            },
            attributes: [ 
                'id', 
                'post_date', 
                'post_title', 
                'post_content' 
            ],
            include: [{ 
                model: User, 
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [ 
                    'id', 
                    'user_id', 
                    'post_id', 
                    'comment_date', 
                    'comment_content'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        });
    
        if (!updatePost) {
            res.status(404).send("Sorry, no posts found!");
            return
        } else {
            const specificPost = updatePost.get({ plain: true });
            res.render('editPost', { specificPost, logged_in: true })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

router.get('/createPost', (req, res) => {
    console.log(req.session.logged_in)
    res.render('addPost');
})

router.get('/createComment', (req, res) => {
    res.render('addComment')
})

module.exports = router;

//So the issue I discovered was not that I wasn't logged in after refresh, but the 'logout' option in the nav bar was not disappearing after I logged out. I have the logic in my navigation links (main.handlebars) that will only show 'logout' if the user is logged in. If I am logged in with a user, and I click 'logout' in the navigation, the logout button still remains, thus me thinking that I was still logged in. But the main overlying issue is still there: why does the 'logout' option still remain, event if I have logged out with the user? Keep in mind that if I click 'log out' again, then the button disappears and I can log back in again. Let me know if this doesn't make sense!