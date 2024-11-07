import config from "./config.js";
import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        console.log()
        await mongoose.connect(config.MONGODBURI)
        console.log(`mongodb Connected ${mongoose.connection.host}`);


    } catch (error) {
        console.error("mongdb connection error", error);
        setTimeout(connectDb, 5000)
    }
}

export default connectDb