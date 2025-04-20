import express from "express";            //for creating server
import mongoose from "mongoose";            //for MongoDB connection
import cors from "cors";            //for cross-origin resource sharing
import dotenv from "dotenv";            //for loading env variables
import { errorMiddleware } from "./middlewares/error.middlewares.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";             //for parsing cookies
import messageRouter from "./routes/msg.routes.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";            //cloud based file storage
import appointmentRouter from "./routes/appoinment.routes.js";
dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares (for parsing incoming requests)
app.use(
  cors({
    // origin: process.env.CLINET_ORIGIN,
    origin: "http://localhost:5173",  
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //for parsing data submitted through forms, extended: true allows for nested objects
app.use(express.json());  //for understanding JSON data in API requests

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//db connection
const uri = `${process.env.ATLAS_URI}/E-healthcare`;
mongoose
  .connect(uri)
  .then(() =>
    console.log(`connected to MongoDB on: ${mongoose.connection.host}`)
  )
  .catch((err) => {
    console.log("Error connecting to MongoDB!!\n", err);
    process.exit(1);
  });

//routes
app.get("/", (req, res) =>
  res.json({ message: "Welcome to the root of the server" })
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appoinments", appointmentRouter);

//error-middleware (centralized error handling)
app.use(errorMiddleware);

//cloudinary init
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//server
app.listen(PORT, () =>
  console.log(`server is running on: http://localhost:${PORT}`)
);
