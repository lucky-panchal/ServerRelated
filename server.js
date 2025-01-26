const express = require ('express');
const app= express();
var cors = require('cors')
const PORT = 3030;
const bcrypt = require ('bcrypt')
const connectDB= require('./config/db');
const UserModel = require('./model/userSchema');
connectDB();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
 res.send("hello , lux here...");
})

app.post('/check-password', async (req, res) => {
    const { userId, oldpass } = req.body;
  
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.send({ isValid: false, error: 'User  not found' });
      }
      const isMatch = await bcrypt.compare(oldpass, user.password);
      if (isMatch) {
        return res.send({ isValid: true });
      } else {
        return res.send({ isValid: false });
      }
    } catch (error) {
      return res.send({ error: 'Server error' });
    }
  });

  app.get('/validate', async (req, res) => {
    const { email } = req.query;
    const user = await UserModel.findOne({ email }); 
    if (user) {
      return res.send({ userId: user._id });
    } else {
      return res.send({ error: 'User  not found' });
    }
  });

  app.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { newpass } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(newpass, 10);
      await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });
      return res.send({ message: 'Password updated successfully' });
    } catch (error) {
      return res.send({ error: 'Server error' });
    }
  });
  

app.post('/register', async (req, res) => {
try{
    const {email,name,password} = req.body
    const userExist = await UserModel.findOne({email})
    if(userExist){
     console.log("User Existed , Please Give Valid Requirements");
     return res.send({error: "Account Already Existed!! Please try with another email."});
    }
    const salt= await bcrypt.genSalt()
    const hash_password=await bcrypt.hash(password,salt)
    const newUser = new UserModel({name,email,password : hash_password })
        await newUser.save();
        console.log("User Created Succesfully :" , newUser);
        return res.send({message: "Account Created."})}
catch(err){
    return res.send(err)
}    
})
app.post('/validate', async (req,res)=>
{
    
    try{
        const {email}=req.body
        const user = await UserModel.findOne({email:email}) 
        if(user){
    
        return res.send({message: "User Found.", user})
        
        }if(!user){
            res.send({error: "User Doesn't Exist."})
        }
    }
    catch(error){
        console.log(error)
    }
})
app.post('/login', async (req,res) =>{
    try{ 
    const {email,password}=req.body
    const user =await UserModel.findOne({email:email})
    
    if(!user){
     return  res.send({error: "Invalid Email or Password."})
    }
    const isMatch= await bcrypt.compare(password, user.password);

    if(isMatch){
        console.log("Login Successfull" , user);    
        return res.send({message: "Logged In Successfully"});
    }
      res.send({error: "Invalid Email or Password."});
    }
    catch(err){
        return res.send(err)
    }
})
app.delete('/delete/:_id',   async (req, res) => {
    const id = req.params._id;
    const userDelete = await UserModel.findOneAndDelete(id)
    if (userDelete) {
        console.log("User Deleted Successfully..",userDelete)
    res.send({ message: "User Deleted Successfully"})
        
    } else {
    res.send({ message: "User not exist" })
    }
})

// app.put('/update/:_id', async (req, res) => {
//     const itemId = req.params._id
//     const updateId = req.body
//     console.log(updateId," = UpdatedSuccessfull")
//     const userUpdate = await UserModel.findByIdAndUpdate({ _id: itemId }, updateId, { name: true })
//     try {
//         if (userUpdate) {
//             res.send({ message: "User Updated Successfully" })
//         }
//         else {
//             res.send({ message: "User not updated Successfully" })
//         }
//     }
//     catch {
//         res.send("error");

//     }
// })

    app.listen(PORT, () => {
      console.log("Server is running successfully");
    })