import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import userModel from "../models/user.model";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await userModel.find({}, "-password"));
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id, "-password")
      .populate("courses");
    if (!user) {
      return res.json({ error: "User was not found" });
    }
    res.json(user);
  } catch (err) {
    res.json({ error: "Something went wrong" });
  }
});

router.put("/:id", [authMiddleware], async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id, "-password");
    if (!user) {
      return res.json({ error: "User does not exist" });
    }
    if (!req.user.roles.includes("admin") && req.user.id !== String(user.id)) {
      return res.json({ error: "You do not have persmissions" });
    }
    Object.assign(user, req.body);
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.json({ error: "Something went wrong" });
  }
});

router.delete("/:id", [authMiddleware], async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id, "-passowrd");
    if (!user) {
      return res.json({ error: "User does not exist" });
    }
    if (!req.user.roles.includes("admin") && req.user.id !== String(user.id)) {
      return res.json({ error: "You do not have persmissions" });
    }
    await user.delete();
    res.json(user);
  } catch (e) {
    res.json({ error: "Something went wrong" });
  }

  // TODO: Delete comments
});

export default router;
