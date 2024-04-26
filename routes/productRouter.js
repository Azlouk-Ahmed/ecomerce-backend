const express = require('express');
const productrouter = express.Router();
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const { updateProduct, createProduct, deleteProduct, getProductById, getProducts, searchProducts, getValuesByProperty } = require('../controllers/productController');


productrouter.post('/', requireAdminAuth, createProduct);


productrouter.put('/:id', requireAdminAuth, updateProduct);


productrouter.delete('/:id', requireAdminAuth, deleteProduct);

productrouter.get('/:id', getProductById);

productrouter.get('/', getProducts);

productrouter.post('/search/searchcriteria', searchProducts);
productrouter.get('/search/:property', getValuesByProperty);



module.exports = productrouter;
