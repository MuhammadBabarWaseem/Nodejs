"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controller/user.controller");
const user_validation_1 = require("../middleware/user.validation");
const router = (0, express_1.Router)();
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
/**
 * @openapi
 * /api/user/update:
 *   put:
 *     tags:
 *       - User Controller
 *     summary: Update user details
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The id of the user to update
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
router.put("/update", user_validation_1.validateUpdateUser, user_validation_1.validateRequest, user_controller_1.updateUserController);
/**
 * @openapi
 * /api/user/get:
 *   get:
 *     tags:
 *       - User Controller
 *     summary: Get a user by Id
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The id of the user
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
router.get("/get", user_controller_1.getUserByIdController);
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
router.get("/getAll", user_controller_1.getAllUsersController);
/**
 * @openapi
 * /api/user/delete:
 *   delete:
 *     tags:
 *       - User Controller
 *     summary: Delete user by id
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The id of the user to delete
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
router.delete("/delete", user_controller_1.deleteUserController);
exports.default = router;
