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
app.post("/register", async (req, res) => {
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
    try{
        app.put("/update/:id" , async (req,res)=>{
        const id =req.params.id;
        const{name,email,password} =req.body
        const userExist = await UserModel.findOneAndUpdate({name})
        if(userExist){
     return res.send({message: "Updated"})
    }else{
        res.send({message:"User Not Exist" })
    }
        })
    }catch(err){
        res.send(err)
    }
})
    app.listen(PORT, () => {
      console.log("Server is running successfully");
    })