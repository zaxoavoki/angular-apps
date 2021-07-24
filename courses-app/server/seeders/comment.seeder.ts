import faker from "faker";
import courseModel from "../models/course.model";
import commentModel from "../models/comment.model";
import userModel from "../models/user.model";

export async function mockComments(count: number) {
  for (let i = 0; i < count; i++) {
    const user = await userModel.findById((await userModel.getRandom())._id);
    const course = await courseModel.findById(
      (
        await courseModel.getRandom()
      )._id
    );

    const comment = await commentModel.create({
      text: faker.lorem.paragraphs(Math.floor(Math.random() * 10) + 1),
      author: user?._id,
      picture: faker.image.business(),
    });

    user?.comments?.push(comment._id);
    course?.comments?.push(comment._id);

    await course?.save();
    await user?.save();
  }
}
