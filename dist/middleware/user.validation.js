"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateRequest = validateRequest;
exports.validateUpdateUser = [
    (0, express_validator_1.check)("name")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),
    (0, express_validator_1.check)("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];
