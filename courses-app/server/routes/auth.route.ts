import faker from "faker";
import jwt from "jsonwebtoken";
import { Router } from "express";
import config from "../config";
import userModel from "../models/user.model";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = (await userModel.findByEmail(email)) as any;
  if (!user) {
    return res.json({ error: "User not found" });
  }
  if (user.password !== password) {
    return res.json({ error: "Wrong password" });
  }
  res.json({
    token: jwt.sign(
      { ...user.toObject({ getters: true, virtuals: true }) },
      config.jwtSecret,
      config.jwtOptions
    ),
  });
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let user = (await userModel.findByEmail(email)) as any;

  if (user) {
    return res.json({ error: "User already exists" });
  }

  user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    courses: [],
    picture: faker.internet.avatar(),
  });

  res.json({
    token: jwt.sign(
      { ...user.toObject({ getters: true, virtuals: true }) },
      config.jwtSecret,
      config.jwtOptions
    ),
  });
});

export default router;
