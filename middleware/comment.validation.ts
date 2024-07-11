import { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

export const createCommentValidator = [
  body("post_id").isString().withMessage("Post ID must be a string"),
  body("author_id").isString().withMessage("Author ID must be a string"),
  body("comment")
    .isString()
    .isLength({ min: 5 })
    .withMessage(
      "Comment must not be empty, and must have a length of 5 or more characters"
    ),
];

export const updateCommentValidator = [
  body("comment")
    .isString()
    .isLength({ min: 5 })
    .withMessage(
      "Comment must not be empty, and must have a length of 5 or more characters"
    ),
];
