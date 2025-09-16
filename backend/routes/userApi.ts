import { Router, type Request, type Response } from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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
  res.status(201).json({ message: "Registration successful" });
});

export default router;
