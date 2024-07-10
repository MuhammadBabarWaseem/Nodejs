import { Request, Response, NextFunction } from "express";
import { check, ValidationChain, validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUpdateUser: ValidationChain[] = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
