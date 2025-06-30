import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: {type: String, required: true},
    path: {type: String, required: true},
    des: {type: String, required: true},
    category:{type:String, required:true},
    createdBy: {type: String}
})

export default mongoose.model("File", fileSchema)