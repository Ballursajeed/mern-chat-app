import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
 {
   name:{
          type:String,
          required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
         type:String,
         required:[true,"Password is required"],
    },
    avatarImage:{
     type:String,
     default:"../public/defaultProfile.jpeg ",
    },
 },
 {
   timestamps: true
 }
 );

export const User = mongoose.model("User",userSchema);


 