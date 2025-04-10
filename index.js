import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/UserRoutes.js";
import bookRoutes from "./routes/BooksRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);

app.get("/", (req, res) => {
    res.status(200).json("GET request successful");
});

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
