const mongoose=require('mongoose');

mongoose.connect(<'mongo-connection-string'>)


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    products: [{
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        quantity: Number,
        price: Number // Add price field
    }],
    total: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    paymentOption: {
        type: String,
        required: true
    },
    cardDetails: {
        cardNumber: String,
        cardHolderName: String,
        expiryDate: String,
        cvv: String
    },
    upiDetails: {
        bankName: String,
        pin: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    }
});

const Order = mongoose.model('Order', orderSchema);



module.exports={
    Order
}
