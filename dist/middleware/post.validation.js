"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidator = exports.createPostValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.validate = validate;
exports.createPostValidator = [
    (0, express_validator_1.body)("author_id").isString().withMessage("Author ID must be a string"),
    (0, express_validator_1.body)("title")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters long"),
    (0, express_validator_1.body)("description")
        .isString()
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters long"),
];
exports.updatePostValidator = [
    (0, express_validator_1.body)("title")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters long"),
    (0, express_validator_1.body)("description")
        .isString()
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters long"),
];
