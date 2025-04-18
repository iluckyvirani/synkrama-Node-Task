import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Successfully Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); 
    }
};

export default connectDB;
