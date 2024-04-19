const express = require('express');
const adressRouter = express.Router();
const { createAddress, updateAddress, deleteAddress, getSpecificAddress } = require('../controllers/adressControllers');
const requireAdminAuth = require('../middlewares/requireAdminAuth');



adressRouter.post('/', createAddress);

adressRouter.put('/:id', updateAddress);

adressRouter.delete('/:id', deleteAddress);

adressRouter.get('/:userId',requireAdminAuth, getSpecificAddress);

module.exports = adressRouter;
