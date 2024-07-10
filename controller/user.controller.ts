import { Request, Response } from "express";
import { validationResult } from "express-validator";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
} from "../service/user.service";

export const createUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const user = await createUser(name, email, password);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User already exists") {
        return res.status(404).json({ message: "User already exists" });
      }
      return res
        .status(500)
        .json({ message: "Failed to create user", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const { name, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await updateUser(email, { name, password });
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(500)
        .json({ message: "Failed to update user", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const getUserByEmailController = async (req: Request, res: Response) => {
  const email = req.query.email as string;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get user", error });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get users", error });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
    const email = req.query.email as string;
  
    try {
      const user = await deleteUser(email);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(500).json({ message: "Failed to delete user", error: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };