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
exports.deleteUser = exports.getAllUsers = exports.getUserByEmail = exports.updateUser = exports.createUser = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield db_config_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield db_config_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return user;
});
exports.createUser = createUser;
const updateUser = (email, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield db_config_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    const { name, password } = updates;
    const data = {};
    if (name) {
        data.name = name;
    }
    if (password) {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        data.password = hashedPassword;
    }
    data.updated_at = new Date();
    const updatedUser = yield db_config_1.default.user.update({
        where: {
            email: email,
        },
        data: data,
    });
    return updatedUser;
});
exports.updateUser = updateUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_config_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    return user;
});
exports.getUserByEmail = getUserByEmail;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_config_1.default.user.findMany();
    return users;
});
exports.getAllUsers = getAllUsers;
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield db_config_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    const deletedUser = yield db_config_1.default.user.delete({
        where: {
            email: email,
        },
    });
    return deletedUser;
});
exports.deleteUser = deleteUser;
