// import dotenv from "dotenv";
// dotenv.config();

// import app from "./src/app.js";
// import connectDB from "./src/db/db.js";

// const PORT = process.env.PORT || 8000;

// const startServer = async() => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };

// startServer();
import express from "express";
import cors from "cors";
import authRouter from "./routes/authroutes.js";
import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            process.env.FRONTEND_URL
        ],
        credentials: true
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "TaskFlow API is running"
    });
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

export default app;