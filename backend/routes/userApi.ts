import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // find user by email
  const user = await User.findOne({ email: email.toLowerCase() });

  // check if user exists and password is correct
  if (!user) {
    return res.status(401).json({ message: "Email not found" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ id: email }, process.env.JWT_SECRET!, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "strict",
  });
  res.status(200).json({ message: "Login successful" });
});

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  // check if email already exists
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // create new user
  const user = await User.create({
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 10),
    name: name[0].toUpperCase() + name.slice(1).toLowerCase(),
  });
  if (!user) {
    return res.status(401).json({ message: "Registration failed" });
  }

  const token = jwt.sign({ id: email }, process.env.JWT_SECRET!, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "strict",
  });

  res.status(201).json({ message: "Registration successful" });
});

router.get("/auth", async (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findOne({ email: decoded.id.toLowerCase() }).select("-password");
    res.status(200).json({ user: user });
  } catch {
    res.status(401).send("Invalid token");
  }
});

export default router;
