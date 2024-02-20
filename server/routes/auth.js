const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

authRouter.get('/user',(req,res)=>{
    res.json({msg:"Hello"})
})

authRouter.post('/api/signUp',async (req,res)=>{
    //get data from the user
    //req.body is where the use send the reques 
    // in form of map format in which all attribute values are came
    try {
        const {name,email,password} = req.body;
        //post that data in the database
        const existingUser = await User.findOne({email}) //Check for Email that already exists
        if(existingUser){
            return res.status(400).json({msg:"User with same Email Address exists!.."})
        }
        const hashedPassword = await bcryptjs.hash(password,8)

        let user = new User({
            name,
            email,
            password : hashedPassword,
        })
        user = await user.save();//saving the user to our database
        
        //return the data back to the user
        res.json(user)
    } catch (e) {
        res.status(500).json({error:e.message})
    } 
});

//SignInUSer
authRouter.post("/api/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Email sent",{ email: email, password: password})
      const user = await User.findOne({ email });
      console.log(
        "user",user
      )
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User with this email does not exist!" });
      }
  
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password." });
      }
  
      const token = jwt.sign({ id: user._id }, "passwordKey");
      res.json({ token, ...user._doc });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

authRouter.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      console.log("Token >> ", token)
      if (!token) return res.json(false);
      const verified = jwt.verify(token, "passwordKey");
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      res.json(true);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

// get user data
authRouter.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
  });


module.exports = authRouter;