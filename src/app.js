import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Body parsers (only once is enough)
app.use(express.json({ limit: "16kb" })) 
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Static + cookies
app.use(express.static("public"))
app.use(cookieParser())

// Routes import 
import taskRouter from './routes/task.routes.js'

// Routes declaration
app.use("/api/v1/tasks", taskRouter)

export { app }
