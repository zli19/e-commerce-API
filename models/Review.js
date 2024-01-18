const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide rating']
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Please provide review title'],
        maxlength: 100,
    },
    comment: {
        type: String,
        required: [true, 'Please provide review text']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true })

ReviewSchema.index({ 'user': 1, 'product': 1 }, { unique: true })

ReviewSchema.statics.getSingleProductReviewStat = async function (productId) {
    const results = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: null,
                averageRating: {
                    $avg: '$rating'
                },
                numOfReviews: {
                    $sum: 1
                }
            }
        }
    ])
    await mongoose.model('Product')
        .findByIdAndUpdate(
            productId,
            {
                averageRating: Math.ceil(results[0]?.averageRating || 0),
                numOfReviews: results[0]?.numOfReviews || 0
            }
        )
}

ReviewSchema.post('save', async function () {
    await this.constructor.getSingleProductReviewStat(this.product)
})

ReviewSchema.post('deleteOne', { document: true, query: false }, async function () {
    await this.constructor.getSingleProductReviewStat(this.product)
})

module.exports = mongoose.model('Review', ReviewSchema)