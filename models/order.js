const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    ingredients: {
        bacon: {
            type: Number,
            required: true
        },
        cheese: {
            type: Number
        },
        meat: {
            type: Number
        },
        salad: {
            type: Number
        }
    },
    orderData: {
        country: {
            type: String
        },
        deliveryMethod: {
            type: String,
        },
        email: {
            type: String
        },
        name: {
            type: String
        },
        street: {
            type: String
        },
        zipcode: {
            type: Number
        }
    },
    price: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('orders', ordersSchema);