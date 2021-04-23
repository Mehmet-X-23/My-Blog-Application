import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/blogPosts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        author: "Mehmet Oğulcan Sağman",
        message: "It is first response..."
    })
});

app.use("/posts" , postRoutes);

const PORT = process.env.PORT || 5000;


mongoose 
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection SUCCESS");
    app.listen(PORT , () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
