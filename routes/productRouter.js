const express = require('express');
const productrouter = express.Router();
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const { updateProduct, createProduct, deleteProduct, getProductById, getProducts } = require('../controllers/productController');


productrouter.post('/', requireAdminAuth, createProduct);


productrouter.put('/:id', requireAdminAuth, updateProduct);


productrouter.delete('/:id', requireAdminAuth, deleteProduct);

productrouter.get('/:id', getProductById);

productrouter.get('/', getProducts);



module.exports = productrouter;
