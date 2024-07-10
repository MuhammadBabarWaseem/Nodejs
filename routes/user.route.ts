import { Router } from "express";
import { check } from "express-validator";

import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByEmailController,
  updateUserController,
} from "../controller/user.controller";
import {
  validateRequest,
  validateUpdateUser,
} from "../middleware/user.validation";

const router = Router();

router.post(
  "/create",
  [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 2 })
      .withMessage("Name is required, and must be at least 2 characters long"),
    check("email").isEmail().withMessage("Please provide a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validateRequest,
  createUserController
);

router.put(
  "/update",
  validateUpdateUser,
  validateRequest,
  updateUserController
);

router.get("/get", getUserByEmailController);

router.get("/getAll", getAllUsersController);

router.delete("/delete", deleteUserController);

export default router;
