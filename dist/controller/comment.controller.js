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
exports.getCommentsByPostIdController = exports.deleteCommentController = exports.updateCommentController = exports.getCommentByIdController = exports.createCommentController = void 0;
const express_validator_1 = require("express-validator");
const comment_service_1 = require("../service/comment.service");
const createCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { author_id, post_id, comment } = req.body;
    try {
        const response = yield (0, comment_service_1.createComment)({ author_id, post_id, comment });
        return res.status(201).json(response);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to create comment",
            error: error.message,
        });
    }
});
exports.createCommentController = createCommentController;
const getCommentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield (0, comment_service_1.getCommentById)(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        return res.status(200).json(comment);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to get comment",
            error: error.message,
        });
    }
});
exports.getCommentByIdController = getCommentByIdController;
const updateCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, userId } = req.query;
    const { comment } = req.body;
    try {
        if (typeof userId !== "string" || typeof id !== "string") {
            throw new Error("Invalid userId or id");
        }
        const updatedComment = yield (0, comment_service_1.updateComment)(id, userId, { comment });
        return res.status(200).json(updatedComment);
    }
    catch (error) {
        console.error("Error in updateCommentController:", error);
        if (error instanceof Error) {
            if (error.message === "Comment not found") {
                return res.status(404).json({ message: "Comment not found!" });
            }
            else if (error.message === "Only the owner can edit this comment") {
                return res
                    .status(401)
                    .json({ message: "Only the owner can edit this comment" });
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
exports.updateCommentController = updateCommentController;
const deleteCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield (0, comment_service_1.deleteComment)(req.query.id);
        return res.status(200).json(comment);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Comment not found") {
                return res.status(404).json({ message: "Comment not found" });
            }
            return res
                .status(500)
                .json({ message: "Failed to delete Comment", error: error.message });
        }
        else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.deleteCommentController = deleteCommentController;
const getCommentsByPostIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, comment_service_1.getCommentsByPostId)(req.query.id);
        return res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to get comments",
            error: error.message,
        });
    }
});
exports.getCommentsByPostIdController = getCommentsByPostIdController;
