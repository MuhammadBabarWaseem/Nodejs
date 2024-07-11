"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controller/post.controller");
const post_validation_1 = require("../middleware/post.validation");
const router = (0, express_1.Router)();
/** POST Methods */
/**
 * @openapi
 * '/api/post/create':
 *  post:
 *     tags:
 *     - Post Controller
 *     summary: Create a Post
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - author_id
 *              - title
 *              - description
 *            properties:
 *              author_id:
 *                type: string
 *                default: clyg6gchj000056qisu91j3o4
 *              title:
 *                type: string
 *                default: Title Of The Post
 *              description:
 *                type: string
 *                default: Description Of The Post
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
router.post("/create", post_validation_1.createPostValidator, post_validation_1.validate, post_controller_1.createPostController);
/** POST Methods */
/**
 * @openapi
 * '/api/post/update':
 *  put:
 *     tags:
 *     - Post Controller
 *     summary: Update a Post
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The id of the post to update
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Updated post data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               default: Updated Title Of The Post
 *             descriptiom:
 *               type: string
 *               default: Updated Description Of The Post
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *            properties:
 *              title:
 *                type: string
 *                default: Title Of The Post
 *              description:
 *                type: string
 *                default: Description Of The Post
 *     responses:
 *      200:
 *         description: Post updated successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Post Not Found
 *      500:
 *        description: Server Error
 */
router.put("/update", post_validation_1.updatePostValidator, post_validation_1.validate, post_controller_1.updatePostController);
exports.default = router;
