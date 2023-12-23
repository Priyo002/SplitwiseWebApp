import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json())


//routes import
import userRouter from "./routes/user.routes.js";
import split from "./routes/split.routes.js"


//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/users/split",split)

export {app}