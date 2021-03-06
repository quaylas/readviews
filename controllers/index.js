const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const createReviewRoutes = require('./create-review-routes');
const singleReviewRoutes = require('./single-review-routes');




router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/create-review', createReviewRoutes);
router.use("/single-review", singleReviewRoutes);

module.exports = router;