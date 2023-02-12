const router = require('express').Router();
const usersRoutes = require('./user-routes');
const commentsRoutes = require('./comments-routes');
const postsRoutes = require('./posts-routes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
