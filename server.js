const express = require ('express');
const app= express();
const Model=require ('./model/userSchema')
const PORT = 3030;

app.get('/', (req, res) => {
 res.send("hello , lux here...")
})
app.listen(PORT, () => {
  console.log("Server is running successfully");
})
