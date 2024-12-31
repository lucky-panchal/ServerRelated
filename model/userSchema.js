const mongoose=require ('mongoose');
const userSchema = mongoose.Schema({
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
const UserModel=mongoose.model('User',userSchema);
module.exports=UserModel