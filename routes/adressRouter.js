const express = require('express');
const adressRouter = express.Router();
const { createAddress, updateAddress, deleteAddress, getSpecificAddress } = require('../controllers/adressControllers');
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const requireAuth = require('../middlewares/requireUserAuth');



adressRouter.post('/',requireAuth, createAddress);

adressRouter.put('/:id',requireAuth, updateAddress);

adressRouter.delete('/:id',requireAuth, deleteAddress);

adressRouter.get('/:userId', getSpecificAddress);

module.exports = adressRouter;
