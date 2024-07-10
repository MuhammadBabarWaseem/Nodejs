import "dotenv/config";

import express from "express";

import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route";
import swaggerDocs from "./config/swagger";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send("Hello World");
});

//User Routes
app.use("/api/user", userRoutes);

//Post Routes
app.use("/api/post", postRoutes);

//Swagger Route
swaggerDocs(app, PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
