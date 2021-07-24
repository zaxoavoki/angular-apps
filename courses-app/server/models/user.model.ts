import {
  getModelForClass,
  index,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Course } from "./course.model";

@index({ email: 1 })
export class User extends TimeStamps {
  @prop({ required: true, minlength: 3 })
  public firstName!: string;

  @prop({ required: true, minlength: 3 })
  public lastName!: string;

  @prop({ required: true, minlength: 6, maxlength: 32 })
  public password!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop()
  public picture?: string;

  @prop({ type: () => [String], default: ["user"] })
  public roles!: string[];

  @prop({ ref: 'Course' })
  public courses?: Ref<Course>[];

  @prop({ ref: 'Comment' })
  public comments?: Ref<Comment>[];

  public static async findByEmail(
    this: ReturnModelType<typeof User>,
    email: string
  ) {
    return (await this.find({ email }))[0];
  }

  public static async getRandom(this: ReturnModelType<typeof User>) {
    return (await this.aggregate([{ $sample: { size: 1 } }]))[0];
  }
}

export default getModelForClass(User);
