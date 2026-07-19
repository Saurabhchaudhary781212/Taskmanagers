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

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);
app.get("/", (req, res) => {
    res.json({ message: "Task Manager API Running" });
});

export default app;