const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const bookRoutes =  require('./book-routes.js');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);

module.exports = router;