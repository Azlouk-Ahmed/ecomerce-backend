const express = require('express');
const promotionrouter = express.Router();
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const { addPromotion, modifyPromotion, deletePromotion, getProductPromotion } = require('../controllers/promotionController');


promotionrouter.post('/:id', requireAdminAuth, addPromotion);


promotionrouter.put('/:id', requireAdminAuth, modifyPromotion);


promotionrouter.delete('/:id', requireAdminAuth, deletePromotion);

promotionrouter.get('/:productId', getProductPromotion);




module.exports = promotionrouter;
