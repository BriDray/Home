const router = require('express').Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const mainRoutes = require('../mainRoutes')

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/main', mainRoutes)

module.exports = router;