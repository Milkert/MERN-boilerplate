import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Backend is connected!", timestamp: new Date().toISOString() });
});

router.get("/login", (req: Request, res: Response) => {
  res.json({ message: "Login route" });
});

export default router;

