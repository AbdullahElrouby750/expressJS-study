import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type:String, required:true},
    password: { type: String, required: true },

    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    phone:{type:String, required:true},
    joinDate:{type:Date, required:true},

    age:{type:Number},
});

export default mongoose.model("User", userSchema);