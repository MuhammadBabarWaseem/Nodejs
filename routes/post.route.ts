import { Router } from "express";
import {
  createPostController,
  updatePostController,
} from "../controller/post.controller";
import {
  createPostValidator,
  updatePostValidator,
  validate,
} from "../middleware/post.validation";

const router = Router();


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
router.post("/create", createPostValidator, validate, createPostController);

router.put("/update", updatePostValidator, validate, updatePostController);

export default router;
