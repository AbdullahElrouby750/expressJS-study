import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type:String, required:true},
    password: { type: String, required: true },

    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    phone:{type:String, required:true},
    joinDate:{type:Date, default: null},

    age:{type:Number, default:null},
});

export default mongoose.model("User", userSchema);