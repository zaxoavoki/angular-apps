import faker from "faker";
import userModel, { User } from "../models/user.model";

export async function mockUsers(count: number) {
  for (let i = 0; i < count; i++) {
    await userModel.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      picture: faker.internet.avatar(),
      password: "password",
      roles: Math.random() > 0.95 ? ["user", "admin"] : ["user"],
    } as User);
  }
}
