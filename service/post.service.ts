import { Post } from "@prisma/client";
import prisma from "../config/db.config";

export const createPost = async (
  data: Omit<Post, "id" | "created_at" | "updated_at" | "comment_count">
): Promise<Post> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: data.author_id,
    },
  });

  if (!existingUser) {
    throw new Error("User Not Found");
  }

  try {
    return await prisma.post.create({
      data,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (
  id: string,
  updateData: { title?: string; description?: string }
) => {
  const existingPost = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingPost) {
    throw new Error("Post not found");
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: updateData,
    });
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
