import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "./user.model";

export class Comment extends TimeStamps {
  @prop({ required: true, minlength: 3 })
  public text!: string;

  @prop({ ref: "User" })
  public author!: Ref<User>;
}

export default getModelForClass(Comment);
