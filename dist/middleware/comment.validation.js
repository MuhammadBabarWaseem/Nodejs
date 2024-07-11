"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentValidator = exports.createCommentValidator = exports.validate = void 0;
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
exports.createCommentValidator = [
    (0, express_validator_1.body)("post_id").isString().withMessage("Post ID must be a string"),
    (0, express_validator_1.body)("author_id").isString().withMessage("Author ID must be a string"),
    (0, express_validator_1.body)("comment")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Comment must not be empty, and must have a length of 5 or more characters"),
];
exports.updateCommentValidator = [
    (0, express_validator_1.body)("comment")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Comment must not be empty, and must have a length of 5 or more characters"),
];
