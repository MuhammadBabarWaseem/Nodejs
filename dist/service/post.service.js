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
exports.updatePost = exports.createPost = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const createPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield db_config_1.default.user.findUnique({
        where: {
            id: data.author_id,
        },
    });
    if (!existingUser) {
        throw new Error("User Not Found");
    }
    try {
        return yield db_config_1.default.post.create({
            data,
        });
    }
    catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
});
exports.createPost = createPost;
const updatePost = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPost = yield db_config_1.default.post.findUnique({
        where: {
            id: id,
        },
    });
    if (!existingPost) {
        throw new Error("Post not found");
    }
    try {
        const updatedPost = yield db_config_1.default.post.update({
            where: {
                id: id,
            },
            data: updateData,
        });
        return updatedPost;
    }
    catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
});
exports.updatePost = updatePost;
