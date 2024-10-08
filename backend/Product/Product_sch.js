const mongoose=require('mongoose');

mongoose.connect(<'mongo-connection-string'>);

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    dateAdded:{
        type:Date,
        default:Date.now
    },
    productDetails:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    // productImage:{
    //     type:String,
    //     required:true
    // }

});


const Product=mongoose.model('Product',productSchema);

module.exports={
    Product
}
