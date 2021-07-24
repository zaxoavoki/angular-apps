import { Request } from "express";
import * as jwt from "jsonwebtoken";
import userModel, { User } from "../models/user.model";

export async function authMiddleware(req: Request, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.json({ error: "You are not authorized" });
  }

  try {
    const decoded = jwt.verify(token, "secret") as User;

    const user = await userModel.findByEmail(decoded.email);
    if (!user) {
      return res.json({ error: "User does not exist" });
    }

    (req as any).user = { ...user.toObject({ getters: true }) };
    next();
  } catch (e) {
    return res.json({ error: "Bad token" });
  }
}
