
import config from './config/config.js';
import connectDb from "./config/db.js";
import app from './app.js'
const start = async () => {
    try {
        await connectDb()
    } catch (error) {
        console.error("error in start server", error);
    }
    app.listen(config.PORT, () => {
        console.log(`server running on ${config.PORT}`);
    })
}

start()