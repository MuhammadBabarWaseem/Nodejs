import { Router } from "express";
import {
  createCommentValidator,
  updateCommentValidator,
  validate,
} from "../middleware/comment.validation";
import {
  createCommentController,
  updateCommentController,
} from "../controller/comment.controller";
import { updateComment } from "service/comment.service";

const router = Router();

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
router.post(
  "/create",
  createCommentValidator,
  validate,
  createCommentController
);


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

router.put(
  "/update",
  updateCommentValidator,
  validate,
  updateCommentController
);

export default router;
