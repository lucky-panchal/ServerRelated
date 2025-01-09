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
    const userExist = await UserModel.findOne({name})
    if(userExist){
     return res.send({message: "User Existed"})
    }
    const user = await UserModel.create(req.body.name)
    UserModel.save();
    return res.send({message: "User Created Successfully"})
}
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

app.put('/update/:id', async (req, res) => {
    const itemId = req.params.id
    const updateId = req.body
    console.log(updateId)
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