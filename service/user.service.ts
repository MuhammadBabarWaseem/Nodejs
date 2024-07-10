import prisma from "../config/db.config";
import bcrypt from "bcryptjs";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const updateUser = async (
  id: string,
  updates: Partial<{
    name: string;
    password: string;
  }>
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const { name, password } = updates;
  const data: {
    name?: string;
    password?: string;
    updated_at?: Date;
  } = {};

  if (name) {
    data.name = name;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;
  }

  data.updated_at = new Date();

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });

  return updatedUser;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      posts: true,
      comments: true,
    },
  });

  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const deleteUser = async (id: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return deletedUser;
};
