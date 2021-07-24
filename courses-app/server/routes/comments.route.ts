import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import commentModel from "../models/comment.model";
import userModel from "../models/user.model";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await commentModel.find().populate("author", "-password"));
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await commentModel
      .findById(req.params.id)
      .populate("author", "-password");
    if (!comment) {
      return res.json({ error: "Comment was not found" });
    }
    res.json(comment);
  } catch (err) {
    res.json({ error: "Something went wrong" });
  }
});

router.put("/:id", [authMiddleware], async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) {
      return res.json({ error: "Comment does not exist" });
    }
    if (!req.user.roles.includes("admin") && req.user.id !== String(comment.author)) {
      return res.json({ error: "You do not have persmissions" });
    }
    Object.assign(comment, req.body);
    await comment.save();
    res.status(200).json(comment);
  } catch (e) {
    console.log(e);
    res.json({ error: "Something went wrong" });
  }
});

router.delete("/:id", [authMiddleware], async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) {
      return res.json({ error: "Comment does not exist" });
    }
    if (!req.user.roles.includes("admin") && req.user.id !== String(comment.author)) {
      return res.json({ error: "You do not have persmissions" });
    }
    await comment.delete();
    res.json(comment);
  } catch (e) {
    res.json({ error: "Something went wrong" });
  }
});

export default router;
