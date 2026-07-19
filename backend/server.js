// import app from "./src/app.js";
// import dotenv from "dotenv";
// import connectDB from "./src/db/db.js"
// dotenv.config();


// console.log(process.env.MONGODB_URL);

// const PORT = process.env.PORT;
// connectDB();

// app.listen(PORT, () => {
//     console.log(`listening to ${PORT}`)
// })
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async() => {
    try {
        await connectDB();
        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();