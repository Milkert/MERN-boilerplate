import { Router } from "express";
import type { Request, Response } from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "dotenv/config";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email not found" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  res.json({ message: "Login successful" });

  const token = jwt.sign({ id: email }, process.env.JWT_SECRET!, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
});

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = await User.create({ email, password: await bcrypt.hash(password, 10), name: name[0].toUpperCase() + name.slice(1).toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Registration failed" });
  }
  res.json({ message: "Registration successful" });
});

export default router;
