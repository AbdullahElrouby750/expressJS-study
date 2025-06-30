import mongoose from "mongoose";

const uri = process.env.mongooseURI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to mongoDB")
    } catch (error) {
        console.error("mongoDB connection error:", error);
        process.exit(1)
    }
}

export default connectDB