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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPostId = exports.deleteComment = exports.updateComment = exports.getCommentById = exports.createComment = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const createComment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { author_id, post_id } = data;
    const authorExists = yield db_config_1.default.user.findUnique({
        where: { id: author_id },
    });
    if (!authorExists) {
        throw new Error("Author does not exist");
    }
    const postExists = yield db_config_1.default.post.findUnique({ where: { id: post_id } });
    if (!postExists) {
        throw new Error("Post does not exist");
    }
    const comment = yield db_config_1.default.comment.create({ data });
    yield db_config_1.default.post.update({
        where: { id: post_id },
        data: {
            comment_count: { increment: 1 },
        },
    });
    return comment;
});
exports.createComment = createComment;
const getCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_config_1.default.comment.findUnique({ where: { id } });
});
exports.getCommentById = getCommentById;
const updateComment = (id, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const commentExists = yield db_config_1.default.comment.findUnique({ where: { id } });
    if (!commentExists) {
        throw new Error("Comment not found");
    }
    if (commentExists.author_id !== userId) {
        throw new Error("Only the owner can edit this comment");
    }
    return db_config_1.default.comment.update({
        where: { id },
        data,
    });
});
exports.updateComment = updateComment;
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const commentExists = yield db_config_1.default.comment.findUnique({ where: { id } });
    if (!commentExists) {
        throw new Error("Comment not found");
    }
    return db_config_1.default.comment.delete({
        where: { id },
    });
});
exports.deleteComment = deleteComment;
const getCommentsByPostId = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return db_config_1.default.comment.findMany({
        where: { post_id: postId },
    });
});
exports.getCommentsByPostId = getCommentsByPostId;
