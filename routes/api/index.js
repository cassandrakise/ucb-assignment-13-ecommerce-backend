const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/category-routes', categoryRoutes);
router.use('/product-routes', productRoutes);
router.use('/tag-routes', tagRoutes);

module.exports = router;
