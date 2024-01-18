const Order = require('../models/Order')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const checkPermissions = require('../utils/checkPermissions')

// this is a fake stripe api
const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'randomValue'
    return { client_secret, amount }
}

const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body
    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart item provided')
    }
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide tax and shipping fee')
    }

    let orderItems = []
    let subtotal = 0
    for (cartItem of cartItems) {
        const { product: productId, price: priceFrontend, } = cartItem
        // check db to ensure product exist and get price from db
        const product = await Product.findById(productId)
        if (!product) {
            throw new CustomError.NotFoundError(`No product with id: ${productId}`)
        }
        const { name, price, image } = product

        const singleOrderItem = {
            amount: cartItem.amount,
            name,
            image,
            price,
            product: productId
        }
        // add item to order
        orderItems.push(singleOrderItem)
        subtotal += price * cartItem.amount
    }
    // calculate total
    const total = subtotal + tax + shippingFee
    // get client secret using the fake stripe api
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd'
    })

    // finally create the order if nothing went wrong
    const order = await Order.create({
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        clientSecret: paymentIntent.client_secret,
        user: req.user.userId
    })

    res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret })
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find({})
    res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params
    const order = await Order.findById(orderId)
    if (!order) {
        throw new CustomError.NotFoundError(`No such order with id: ${orderId}`)
    }
    checkPermissions(req.user, order.user.toString())
    res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
   const orders = await Order.find({user: req.user.userId})
   res.status(StatusCodes.OK).json({orders, count: orders.length})
}

const payOrder = async (req, res) => {
    const { id: orderId } = req.params
    const {paymentIntentId} = req.body
    const order = await Order.findById(orderId)
    if (!order) {
        throw new CustomError.NotFoundError(`No such order with id: ${orderId}`)
    }
    checkPermissions(req.user, order.user.toString())
    
    order.paymentIntentId = paymentIntentId
    order.status = 'paid'
    await order.save()

    res.status(StatusCodes.OK).json({ order })
}

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    payOrder
}
