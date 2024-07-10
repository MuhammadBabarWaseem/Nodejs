import "dotenv/config";

import express from "express";

import userRoutes from "./routes/user.route";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send("Hello World");
});

//User Routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
