import { Router } from "express";
import faker from "faker";
import { authMiddleware } from "../middlewares/auth.middleware";
import courseModel from "../models/course.model";
import userModel from "../models/user.model";

const router = Router();

router.post("/", [authMiddleware], async (req, res) => {
  const { title, text, teacherId, startsAt, endsAt } = req.body;

  if (!req.user.roles.includes("admin")) {
    return res.json({ error: "You dont have permission" });
  }

  try {
    res.json(
      await courseModel.create({
        title,
        text,
        teacher: (await userModel.findById(teacherId))?.id,
        startsAt: new Date(Date.parse(startsAt)),
        endsAt: new Date(Date.parse(endsAt)),
        picture: faker.image.business(),
      })
    );
  } catch (e) {
    res.json({ error: "User does not exist" });
  }
});

// request: { courseId: '', userId: '', action: 'leave|join' }
router.post("/participate", async (req, res) => {
  const { courseId, userId, action } = req.body;
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.json({ error: "Course does not exist" });
    }
    const user = await userModel.findById(userId, "-password");
    if (!user) {
      return res.json({ error: "User does not exist" });
    }

    if (action === "join") {
      if (user.courses?.find((c: any) => String(c) === courseId)) {
        return res.json({
          error: "You have already participanting this course",
        });
      }
      user.courses?.push(course);
      await user.save();
      course.participants?.push(user);
      await course.save();
      return res.json(user.toObject({ getters: true }));
    }

    if (action === "leave") {
      if (!course.participants?.includes(user.id)) {
        return res.json({ error: "You are not participanting this course" });
      }
      await userModel.findByIdAndUpdate(userId, {
        $pull: { courses: course._id },
      });
      await courseModel.findByIdAndUpdate(courseId, {
        $pull: { participants: user._id },
      });
      return res.json(user);
    }

    return res.json({ error: "Bad request" });
  } catch (e) {
    return res.json({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await courseModel
      .findById(req.params.id)
      .populate("teacher", "-password")
      .populate("participants", "-password");
    if (!course) {
      return res.json({ error: "Course was not found" });
    }
    res.json(course.toObject());
  } catch (e) {
    res.json({ error: "Something went wrong" });
  }
});

router.put("/:id", [authMiddleware], async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.json({ error: "Course does not exist" });
    }

    if (!req.user.roles.includes("admin")) {
      return res.json({ error: "You dont have permission" });
    }

    res.json(await courseModel.update(req.body));
  } catch (e) {
    res.json({ error: "Something went wrong" });
  }
});

router.delete("/:id", [authMiddleware], async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.json({ error: "Course does not exist" });
    }
    if (!req.user.roles.includes("admin")) {
      return res.json({ error: "You do not have permission" });
    }
    res.json(await course.delete());
  } catch (e) {
    res.json({ error: "Something went wrong" });
  }

  // TODO: delete comments
});

router.get("/", async (req, res) => {
  res.json(
    await courseModel
      .find()
      .populate("teacher", "-password")
      .populate("participants", "-password")
  );
});

export default router;
