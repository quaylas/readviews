const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const bookRoutes =  require('./book-routes.js');
const reviewRoutes =  require('./review-routes');
const commentRoutes = require('./comment-routes');
const voteRoutes =  require('./vote-routes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);
router.use('/comment', commentRoutes);
router.use('/votes', voteRoutes);


module.exports = router;