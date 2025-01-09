const express = require ('express');
const app= express();
const PORT = 3030;
const connectDB= require('./config/db');
const UserModel = require('./model/userSchema');
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
 res.send("hello , lux here...")
})



app.post('/register', async (req, res) => {
try{
    const {email,name,password} = req.body
    
    const userExist = await UserModel.findOne({email})
    if(userExist){
     console.log("User Existed , Please Give Valid Requirements");
     return res.send({message: "User Existed , Please Give Valid Requirements"});
     
    }
    const user = await UserModel.create(req.body)
        await user.save();
         console.log("User Create Succesfully...");
         console.log(user)
         res.send({message: "User Created successfully"})}
catch(err){
    return res.send(err)
}    
})
app.delete('/delete/:_id',   async (req, res) => {
    const id = req.params._id;
    const userDelete = await UserModel.findOneAndDelete(id)
    if (userDelete) {
        res.send({ message: "User Deleted Successfully" })
    } else {
        res.send({ message: "User not exist" })
    }
})

app.put('/update/:_id', async (req, res) => {
    const itemId = req.params._id
    const updateId = req.body
    console.log(updateId," = UpdatedSuccessfull")
    const userUpdate = await UserModel.findByIdAndUpdate({ _id: itemId }, updateId, { name: true })
    try {
        if (userUpdate) {
            res.send({ message: "User Updated Successfully" })
        }
        else {
            res.send({ message: "User not updated Successfully" })
        }
    }
    catch {
        res.send("error");

    }
})

    app.listen(PORT, () => {
      console.log("Server is running successfully");
    })