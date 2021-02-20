const express = require('express')

const router = express.Router();

const productsController = require('../controllers/products');

// CREATE -> POST
router.use('/product', productsController.createProduct)

// READ -> GET
router.use('/products', productsController.getAllProducts)

module.exports = router;
