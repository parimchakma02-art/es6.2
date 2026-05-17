



import "dotenv/config";
import app from "./src/app.js";
import { connectDb } from "./src/utils/db.js";

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URI;


const startServer = async () => {
    try {
        await connectDb(mongoUrl);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}


startServer()
