"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    return res.send("Hello World");
});
//User Routes
app.use("/api/user", user_route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
