import express from "express";
import cors from "cors";

import routerUsers from "./routes/users.route";
import routerCourses from "./routes/courses.route";
import routerComments from "./routes/comments.route";
import routerAuth from "./routes/auth.route";
import { mongoose } from "@typegoose/typegoose";

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/course-ng-server", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to mongodb");
  });

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use("/users", routerUsers);
app.use("/courses", routerCourses);
app.use("/comments", routerComments);
app.use("/", routerAuth);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
