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

/** POST Methods */
/**
 * @openapi
 * '/api/user/create':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
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

/**
 * @openapi
 * /api/user/update:
 *   put:
 *     tags:
 *       - User Controller
 *     summary: Update user details
 *     parameters:
 *       - name: email
 *         in: query
 *         description: The email of the user to update
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Updated user data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               default: johndoe
 *             password:
 *               type: string
 *               default: johnDoe20!@
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */

router.put(
  "/update",
  validateUpdateUser,
  validateRequest,
  updateUserController
);

/**
 * @openapi
 * /api/user/get:
 *   get:
 *     tags:
 *       - User Controller
 *     summary: Get a user by email
 *     parameters:
 *       - name: email
 *         in: query
 *         description: The email of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returned User
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User Not Found
 *       500:
 *         description: Server Error
 */
router.get("/get", getUserByEmailController);

/**
 * @openapi
 * /api/user/getAll:
 *   get:
 *     tags:
 *       - User Controller
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of all users
 *       500:
 *         description: Server Error
 */
router.get("/getAll", getAllUsersController);

/**
 * @openapi
 * /api/user/delete:
 *   delete:
 *     tags:
 *       - User Controller
 *     summary: Delete user by email
 *     parameters:
 *       - name: email
 *         in: query
 *         description: The email of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.delete("/delete", deleteUserController);

export default router;
