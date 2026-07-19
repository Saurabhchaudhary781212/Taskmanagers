// import express from "express";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import notFound from "./middleware/NotFound.js";
// import errorHandler from "./middleware/errorHandler.js";

// const app = express();

// app.use(cors({
//     origin: [
//         "https://taskmanagers-olive.vercel.app",
//         "http://localhost:5173",
//     ],
//     credentials: true,
// }));

// app.use(express.json());

// app.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Task Manager API is running 🚀",
//     });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

// app.use(notFound);
// app.use(errorHandler);

// export default app;
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authroutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import notFound from "./middleware/NotFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

/* =========================
   CORS Configuration
========================= */

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            /*
                Allow requests without an origin, such as:
                - Postman
                - Thunder Client
                - Server-to-server requests
            */

            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

/* =========================
   Middleware
========================= */

app.use(express.json());

/* =========================
   Test Route
========================= */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TaskFlow API is running"
    });
});

/* =========================
   API Routes
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* =========================
   Error Middleware
========================= */

app.use(notFound);
app.use(errorHandler);

export default app;