const mongoose=require('mongoose');
const {mongoUrl}=require('../db/Connection');

mongoose.connect(mongoUrl)


const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        price: Number // Add price field
    }]
});


const Cart= mongoose.model('Cart',cartSchema);

module.exports={
    Cart
}