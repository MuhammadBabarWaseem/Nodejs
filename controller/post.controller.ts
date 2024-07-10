import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createPost, updatePost } from "../service/post.service";

export const createPostController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { author_id, title, description } = req.body;

  try {
    const post = await createPost({ author_id, title, description });
    res.status(201).json(post);
  } catch (error) {
    console.error("Error in createPostController:", error);
    if (error instanceof Error) {
      if (error.message === "User Not Found") {
        return res.status(404).json({ message: "User not found!" });
      }
      return res
        .status(500)
        .json({ message: "Failed to Create Post", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const { title, description } = req.body;

  try {
    const updatedPost = await updatePost(id, { title, description });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error in updatePostController:", error);
    if (error instanceof Error) {
      if (error.message === "Post not found") {
        return res.status(404).json({ message: "Post not found!" });
      }
      return res
        .status(500)
        .json({ message: "Failed to Update Post", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
