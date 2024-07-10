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
exports.deleteUserController = exports.getAllUsersController = exports.getUserByIdController = exports.updateUserController = exports.createUserController = void 0;
const express_validator_1 = require("express-validator");
const user_service_1 = require("../service/user.service");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        const user = yield (0, user_service_1.createUser)(name, email, password);
        return res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "User already exists") {
                return res.status(404).json({ message: "User already exists" });
            }
            return res
                .status(500)
                .json({ message: "Failed to create user", error: error.message });
        }
        else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.createUserController = createUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const { name, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield (0, user_service_1.updateUser)(id, { name, password });
        return res.status(200).json({ message: "User updated successfully", user });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "User not found") {
                return res.status(404).json({ message: "User not found" });
            }
            return res
                .status(500)
                .json({ message: "Failed to update user", error: error.message });
        }
        else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.updateUserController = updateUserController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const user = yield (0, user_service_1.getUserById)(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to get user", error });
    }
});
exports.getUserByIdController = getUserByIdController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to get users", error });
    }
});
exports.getAllUsersController = getAllUsersController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const user = yield (0, user_service_1.deleteUser)(id);
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "User not found") {
                return res.status(404).json({ message: "User not found" });
            }
            return res
                .status(500)
                .json({ message: "Failed to delete user", error: error.message });
        }
        else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.deleteUserController = deleteUserController;
