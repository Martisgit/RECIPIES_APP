import express from "express";
import cors from "cors";
import recipeRouter from "./src/route/recipes.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(recipeRouter);

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(() => {
    console.log("Connection to MongoDB failed");
  });

app.use((req, res) => {
  res.status(404).json({ response: "Your endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`App started on port ${process.env.PORT}`);
});
