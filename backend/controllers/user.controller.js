import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUserController = async(req,res) => {

 try {

   //get the data
    const { name, email, password, avatarImage } = req.body;

  //validation
    if (!name || !email || !password) {
     console.log("All fields are required!");
     res
    .status(200)
    .send({
         success:false,
         message:"All fields are required!"
    })
    }

  //check whether the user is already exist or not
  const existedUser = await User.findOne({ email });
  if (existedUser) {
     console.log("User is already exist!!");
     res
    .status(200)
    .send({
         success:false,
         message:"User is already exist!!"
    })
  }

  //hashing a password
  const hashedPassword = await bcrypt.hash(password,10);

  //storing in DataBase
  const user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatarImage
  });

  // Create a JWT token and send it in the response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  //sending success respond
  res
  .cookie('token',token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
  .status(201)
  .send({
         success: true,
         message:"User registered successfully!",
         user,
         token
  });


 } catch (error) {
    console.log("Error in register:",error);
    res
    .status(400)
    .send({
         success:false,
         Error: error.message,
    })
 }


}


 const loginUserController = async(req,res) => {

 try {

 //get the data
  const { email, password } = req.body;

//validation
   if (!email || !password) {
    console.log("All fields are required!");
     return res
     .status(200)
     .send({
          success:false,
          message:"All fields are required!"
     })
}

//check in Data Base
   const user = await User.findOne({ email });
   if (!user) {
     console.log("User is Not found!!");
    return res
    .status(200)
    .send({
         success:false,
         message:"User is Not found!!"
    })
   }

//verify the password
const isMatch = await bcrypt.compare(password,user.password);
 if (!isMatch) {
     console.log("Invalid Password or email");
    return res
    .status(200)
    .send({
         success:false,
         message:"Invalid Password or email"
    })
 }

  // Create a JWT token and send it in the response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(200)
 .send({
    success: true,
    message: "Login successfully",
    user,
    token
 })

 } catch (error) {
    console.log("Error in login:",error);
    res
    .status(200)
    .send({
         success:false,
         Error: error.message,
    })
 }

 }

export {
 registerUserController,
 loginUserController
}
