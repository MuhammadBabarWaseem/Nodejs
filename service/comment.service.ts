import { Comment } from "@prisma/client";
import prisma from "../config/db.config";

export const createComment = async (
  data: Omit<Comment, "id" | "created_at" | "updated_at">
): Promise<Comment> => {
  const { author_id, post_id } = data;

  const authorExists = await prisma.user.findUnique({
    where: { id: author_id },
  });
  if (!authorExists) {
    throw new Error("Author does not exist");
  }

  const postExists = await prisma.post.findUnique({ where: { id: post_id } });
  if (!postExists) {
    throw new Error("Post does not exist");
  }

  const comment = await prisma.comment.create({ data });

  await prisma.post.update({
    where: { id: post_id },
    data: {
      comment_count: { increment: 1 },
    },
  });

  return comment;
};

export const getCommentById = async (id: string): Promise<Comment | null> => {
  return prisma.comment.findUnique({ where: { id } });
};

export const updateComment = async (
    id: string,
    userId: string,
    data: Partial<Pick<Comment, 'comment'>>
): Promise<Comment> => {
    const commentExists = await prisma.comment.findUnique({ where: { id } });
    if (!commentExists) {
        throw new Error("Comment not found");
    }

    if (commentExists.author_id !== userId) {
        throw new Error("Only the owner can edit this comment");
    }

    return prisma.comment.update({
        where: { id },
        data,
    });
};

export const deleteComment = async (id: string): Promise<Comment> => {
  const commentExists = await prisma.comment.findUnique({ where: { id } });
  if (!commentExists) {
    throw new Error("Comment not found");
  }

  return prisma.comment.delete({
    where: { id },
  });
};

export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  return prisma.comment.findMany({
    where: { post_id: postId },
  });
};
