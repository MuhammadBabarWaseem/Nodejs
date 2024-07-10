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

export const createPostValidator = [
  body("author_id").isString().withMessage("Author ID must be a string"),
  body("title")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long"),
  body("description")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
];

export const updatePostValidator = [
  body("title")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long"),
  body("description")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
];
