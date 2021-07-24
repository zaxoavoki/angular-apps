import {
  getModelForClass,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "./user.model";

export class Course extends TimeStamps {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public text!: string;

  @prop()
  public picture?: string;

  @prop({ required: true })
  public startsAt!: Date;

  @prop({ required: true })
  public endsAt!: Date;

  @prop({ ref: 'User' })
  public participants?: Ref<User>[];

  @prop({ ref: 'Comment' })
  public comments?: Ref<Comment>[];

  @prop({ ref: 'User' })
  public teacher!: Ref<User>;

  public static async getRandom(this: ReturnModelType<typeof Course>) {
    return (await this.aggregate([{ $sample: { size: 1 } }]))[0];
  }
}

export default getModelForClass(Course);
