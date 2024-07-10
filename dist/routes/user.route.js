"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controller/user.controller");
const user_validation_1 = require("../middleware/user.validation");
const router = (0, express_1.Router)();
router.post("/create", [
    (0, express_validator_1.check)("name")
        .not()
        .isEmpty()
        .isLength({ min: 2 })
        .withMessage("Name is required, and must be at least 2 characters long"),
    (0, express_validator_1.check)("email").isEmail().withMessage("Please provide a valid email"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
], user_validation_1.validateRequest, user_controller_1.createUserController);
router.put("/update", user_validation_1.validateUpdateUser, user_validation_1.validateRequest, user_controller_1.updateUserController);
router.get("/get", user_controller_1.getUserByEmailController);
router.get("/getAll", user_controller_1.getAllUsersController);
router.delete("/delete", user_controller_1.deleteUserController);
exports.default = router;
