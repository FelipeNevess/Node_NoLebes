const { Router } = require('express');

const controllers = require('../controllers/products/index');

const router = Router();

router.post('/products', controllers.createProduct);
router.get('/products', controllers.getAllProducts);

module.exports = router;