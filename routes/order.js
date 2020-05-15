const express = require('express');
const isAuth = require('../middleware/is-auth');
const orderControllers = require('../controllers/order');
const router = express.Router();

router.get('/', isAuth, orderControllers.getOrders);
router.post('/', isAuth, orderControllers.postOrder);
module.exports = router;