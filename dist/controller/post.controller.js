"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostController = exports.createPostController = void 0;
const express_validator_1 = require("express-validator");
const post_service_1 = require("../service/post.service");
const createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { author_id, title, description } = req.body;
    try {
        const post = yield (0, post_service_1.createPost)({ author_id, title, description });
        res.status(201).json(post);
    }
    catch (error) {
        console.error("Error in createPostController:", error);
        if (error instanceof Error) {
            if (error.message === "User Not Found") {
                return res.status(404).json({ message: "User not found!" });
            }
            return res
                .status(500)
                .json({ message: "Failed to Create Post", error: error.message });
        }
        else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.createPostController = createPostController;
const updatePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const { title, description } = req.body;
    try {
        const updatedPost = yield (0, post_service_1.updatePost)(id, { title, description });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        console.error("Error in updatePostController:", error);
        if (error instanceof Error) {
            if (error.message === "Post not found") {
                return res.status(404).json({ message: "Post not found!" });
            }
            return res
                .status(500)
                .json({ message: "Failed to Update Post", error: error.message });
        }
        else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.updatePostController = updatePostController;
