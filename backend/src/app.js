import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import notFound from "./middleware/NotFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json())

app.use(
    cors({
        origin: [
            "https://taskmanagers-olive.vercel.app",
            "http://localhost:5173",
        ],
        credentials: true,
    })
);
app.use(express.json());

app.use("https://taskmanagers-ila1.onrender.com/api/auth", authRoutes);
app.use("https://taskmanagers-ila1.onrender.com/api/tasks", taskRoutes);
app.get("https://taskmanagers-ila1.onrender.com/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Task Manager API is running 🚀",
    });
});

app.use(notFound);
app.use(errorHandler);
app.get("https://taskmanagers-ila1.onrender.com/", (req, res) => {
    res.json({ message: "Task Manager API Running" });
});

export default app;