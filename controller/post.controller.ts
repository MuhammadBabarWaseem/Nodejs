import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  updatePost,
} from "../service/post.service";

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

export const deletePostController = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  console.log({ id });
  try {
    await deletePost(id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Post not found") {
        return res.status(404).json({ message: "Post not found" });
      }
      return res
        .status(500)
        .json({ message: "Failed to delete Post", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const getPostByIdController = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    const post = await getPostById(id);
    return res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Post not found") {
        return res.status(404).json({ message: "Post not found" });
      }
      return res
        .status(500)
        .json({ message: "Failed to get Post", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const getAllPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Failed to get Posts", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const getPostsByAuthorIdController = async (
  req: Request,
  res: Response
) => {
  const author_id = req.query.author_id as string;
  try {
    const posts = await getPostsByAuthorId(author_id);
    return res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "No post found for this author") {
        return res
          .status(404)
          .json({ message: "No post found for this author" });
      }
      return res
        .status(500)
        .json({ message: "Failed to get Posts", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
