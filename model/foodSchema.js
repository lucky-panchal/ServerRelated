const mongoose=require ('mongoose');
const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    passsword:{
        type: String,   
        require: true
    }
})
const foodModel=mongoose.model('Food',foodSchema)
module.exports=foodModel