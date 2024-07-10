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
  email: string,
  updates: Partial<{
    name: string;
    password: string;
  }>
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
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
      email: email,
    },
    data: data,
  });

  return updatedUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const deleteUser = async (email: string) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  
    if (!existingUser) {
      throw new Error("User not found");
    }
  
    const deletedUser = await prisma.user.delete({
      where: {
        email: email,
      },
    });
  
    return deletedUser;
  };
