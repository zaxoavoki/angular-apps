import { datatype, image, lorem } from "faker";
import courseModel from "../models/course.model";
import userModel from "../models/user.model";

export async function mockCourses(count: number) {
  for (let i = 0; i < count; i++) {
    const users = Array.from({ length: datatype.number(5) }, async () =>
      await userModel.findById((await userModel.getRandom())._id)
    );

    try {
      const course = await courseModel.create({
        title: lorem.sentence(),
        text: lorem.paragraphs(Math.floor(Math.random() * 10) + 1),
        participants: await Promise.all(
          users.map(async (user) => (await user)?._id)
        ),
        teacher: (await userModel.getRandom())._id,
        picture: image.business(),
        startsAt: new Date(),
        endsAt: new Date(Date.now() + 1000 * Math.random() * 100 * 3600),
      });

      for (const user of users) {
        const _user = await user;
        _user?.courses?.push(course);
        await _user?.save();
      }
    } catch (e) {
      console.log("error", e);
    }
  }
}
