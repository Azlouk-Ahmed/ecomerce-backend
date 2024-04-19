const express = require('express');
const { createOrder, getAllOrders, getUserOrders, deleteOrder, updateOrderStatus } = require('../controllers/orderController');
const requireAuth = require('../middlewares/requireUserAuth');
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const orderRouter = express.Router();


orderRouter.post('/', requireAuth,createOrder);

orderRouter.delete('/:id', requireAdminAuth, deleteOrder);

orderRouter.get('/', requireAdminAuth,getAllOrders);

orderRouter.get('/user', requireAuth, getUserOrders);

orderRouter.put('/:id', requireAdminAuth,updateOrderStatus);

module.exports = orderRouter;
