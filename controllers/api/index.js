const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const bookRoutes =  require('./book-routes.js');
const reviewRoutes =  require('./review-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);
router.use('/comment', commentRoutes)


module.exports = router;