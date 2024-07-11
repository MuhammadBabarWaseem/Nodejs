"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
const swagger_1 = __importDefault(require("./config/swagger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    return res.send("Hello World");
});
//User Routes
app.use("/api/user", user_route_1.default);
//Post Routes
app.use("/api/post", post_route_1.default);
//Comment Route
app.use("/api/comment", comment_route_1.default);
//Swagger Route
(0, swagger_1.default)(app, PORT);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
