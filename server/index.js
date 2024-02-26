//IMPORT PAKAGES
const express = require("express");
const mongoose = require("mongoose"); 
//IMPORT FROM OTHER FILES
const authRouter = require("./routes/auth");
const e = require("express");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
// INIT
const PORT = 3000;
const DB = "mongodb+srv://Hemanth:Hemanth123@cluster0.amgqe1v.mongodb.net/?retryWrites=true&w=majority"
const app = express();

//MIDDLEWARE
app.use(express.json())
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

//connections
mongoose.connect(DB).then(
    () => {console.log('connected to MongoDB')},
).catch((e)=>{
    console.log(e);
})
//Creating API for CRUD
// Create,Read, Update,Delete


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})