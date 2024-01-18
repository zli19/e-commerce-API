const router = require('express').Router()
const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    payOrder
} = require('../controllers/orderController')
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')


router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllOrders).post(authenticateUser, createOrder)

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router.route('/:id').get(authenticateUser, getSingleOrder).patch(authenticateUser, payOrder)

module.exports = router