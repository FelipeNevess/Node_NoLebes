const { Router } = require('express');

const controllers = require('../controllers/products/index');

const router = Router();

router.post('/products', controllers.createProduct);
router.get('/products', controllers.getAllProducts);
router.get('/products/:id', controllers.getByIdProduct);
router.put('/products/:id', controllers.productUpdate);
router.delete('/products/:id', controllers.removeProduct);

module.exports = router;