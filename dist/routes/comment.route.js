"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_validation_1 = require("../middleware/comment.validation");
const comment_controller_1 = require("../controller/comment.controller");
const router = (0, express_1.Router)();
/** POST Methods */
/**
 * @openapi
 * '/api/comment/create':
 *  post:
 *     tags:
 *     - Comment Controller
 *     summary: Create a Comment
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - author_id
 *              - post_id
 *              - comment
 *            properties:
 *              author_id:
 *                type: string
 *                default: clyg6gchj000056qisu91j3o4
 *              post_id:
 *                type: string
 *                default: clyfyp2bv0002wxjr0h0yjuwi
 *              comment:
 *                type: string
 *                default: Nice Post!
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
router.post("/create", comment_validation_1.createCommentValidator, comment_validation_1.validate, comment_controller_1.createCommentController);
/** POST Methods */
/**
 * @openapi
 * '/api/comment/update':
 *  put:
 *     tags:
 *     - Comment Controller
 *     summary: Update a Comment
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The id of the comment to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId
 *         in: query
 *         description: The id of the user who owns the comment
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 default: Updated content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Bad Request - Invalid input, missing fields, etc.
 *       404:
 *         description: Comment Not Found - The specified comment ID does not exist
 *       500:
 *         description: Server Error - Unable to process the request due to server issues
 */
router.put("/update", comment_validation_1.updateCommentValidator, comment_validation_1.validate, comment_controller_1.updateCommentController);
exports.default = router;
