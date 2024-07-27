const mongoose=require('mongoose');
const {mongoUrl}=require('../db/Connection');

mongoose.connect(mongoUrl);


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items_in_cart: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }]
})

const User=mongoose.model('User',userSchema);

module.exports={
    User
}
