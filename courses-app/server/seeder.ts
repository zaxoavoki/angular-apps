import { mongoose } from "@typegoose/typegoose";
import { mockComments } from "./seeders/comment.seeder";
import { mockCourses } from "./seeders/course.seeder";
import { mockUsers } from "./seeders/user.seeder";

(async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/course-ng-server", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await mockUsers(50);
    await mockCourses(25);
    await mockComments(60);

    process.exit(0);
  } catch (e) {
    console.log(e);
  }
})();
