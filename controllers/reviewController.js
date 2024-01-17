const Review = require('../models/Review')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const checkPermissions = require('../utils/checkPermissions')

const createReview = async (req, res) => {
    const { product: productId } = req.body
    const { userId } = req.user

    const productExists = await Product.findById(productId)
    if (!productExists) {
        throw new CustomError.NotFoundError(`No product with id ${productId}`)
    }

    const alreadySubmitted = await Review.findOne({
        user: userId,
        product: productId
    })
    if (alreadySubmitted) {
        throw new CustomError.BadRequestError('Already submitted review for this product')
    }

    req.body.user = userId
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).json({ review })
}

const getAllReviews = async (req, res) => {
    const reviews = await await Review.find({})
        .populate({
            path: 'product',
            select: 'name company price'
        })

    res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

const getSingleReview = async (req, res) => {
    const { id: reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review) {
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    }
    res.status(StatusCodes.OK).json({ review })
}

const updateReview = async (req, res) => {
    const { id: reviewId } = req.params
    const { rating, title, comment } = req.body
    const review = await Review.findById(reviewId)
    if (!review) {
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    }

    checkPermissions(req.user, review.user.toString())
    review.rating = rating
    review.title = title
    review.comment = comment
    await review.save()

    res.status(StatusCodes.OK).json({ review })
}

const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review) {
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    }

    checkPermissions(req.user, review.user.toString())
    await review.deleteOne()

    res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' })
}

const getSingleProductReviews = async (req, res)=>{
    const {id: productId} = req.params
    const reviews = await Review.find({product: productId})
    res.status(StatusCodes.OK).json({reviews, count: reviews.length})
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    getSingleProductReviews
}