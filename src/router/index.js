const { Router } = require('express');

const productControler = require('../controllers/products/index');
const productSale = require('../controllers/sales/index');

const { verifySalesBody, verifySalesQuantity } = require('../middlewares/salesValidations');

const router = Router();

router.post('/products', productControler.createProduct);
router.get('/products', productControler.getAllProducts);
router.get('/products/:id', productControler.getByIdProduct);
router.put('/products/:id', productControler.productUpdate);
router.delete('/products/:id', productControler.removeProduct);

router.post('/sales', verifySalesBody, verifySalesQuantity, productSale.createSales);
router.get('/sales', productSale.getAllSales);
router.get('/sales/:id', productSale.getBySaleId);

module.exports = router;