const router = require('express').Router();

const apiRoutes= require('./api');
const homeRoute = require('./homeRoute.js');
const dashboard = require('./dashboard.js');
const gamesRoute = require('./gamesRoute.js');

router.use('/', homeRoute);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboard);
router.use('/games', gamesRoute);

module.exports = router;
