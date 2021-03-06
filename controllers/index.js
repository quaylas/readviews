const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const createReviewRoutes = require('./create-review-routes');
const editReviewRoutes = require('./edit-review-routes');




router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/create-review', createReviewRoutes);
router.use('/edit-review',  editReviewRoutes);

module.exports = router;