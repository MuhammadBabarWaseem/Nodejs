import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentsByPostId,
  updateComment,
} from "../service/comment.service";

export const createCommentController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { author_id, post_id, comment } = req.body;

  try {
    const response = await createComment({ author_id, post_id, comment });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create comment",
      error: (error as Error).message,
    });
  }
};

export const getCommentByIdController = async (req: Request, res: Response) => {
  try {
    const comment = await getCommentById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get comment",
      error: (error as Error).message,
    });
  }
};

export const updateCommentController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, userId } = req.query;
  const { comment } = req.body;

  try {
    if (typeof userId !== "string" || typeof id !== "string") {
      throw new Error("Invalid userId or id");
    }

    const updatedComment = await updateComment(id, userId, { comment });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error in updateCommentController:", error);
    if (error instanceof Error) {
      if (error.message === "Comment not found") {
        return res.status(404).json({ message: "Comment not found!" });
      } else if (error.message === "Only the owner can edit this comment") {
        return res
          .status(401)
          .json({ message: "Only the owner can edit this comment" });
      }
      return res
        .status(500)
        .json({ message: "Failed to Create Post", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
  //   catch (error) {
  //     return res.status(500).json({
  //       message: "Failed to update comment",
  //       error: (error as Error).message,
  //     });
  //   }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const comment = await deleteComment(req.query.id as string);
    return res.status(200).json(comment);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Comment not found") {
        return res.status(404).json({ message: "Comment not found" });
      }
      return res
        .status(500)
        .json({ message: "Failed to delete Comment", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const getCommentsByPostIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const comments = await getCommentsByPostId(req.query.id as string);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get comments",
      error: (error as Error).message,
    });
  }
};
