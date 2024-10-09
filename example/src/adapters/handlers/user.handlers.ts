import { error, json, type RouterHandler } from "pulsar-http";

import { UserService } from "../../application/user.service";
import { UserRepository } from "../repository/user.repository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const handleGetUsers: RouterHandler = async () => {
  const users = await userService.getAllUsers();

  return json(users);
};

export const handleGetUser: RouterHandler = async (
  _,
  params: { id?: string },
) => {
  const id = params.id;

  if (!id) {
    return error(400, "User ID is required");
  }

  const user = await userService.getUserById(id);

  if (user) {
    return json(user);
  } else {
    return error(404);
  }
};

export const handleCreateUser: RouterHandler = async (request: Request) => {
  try {
    const { name, email } = await request.json();
    const user = await userService.createUser(name, email);

    return json(user);
  } catch (e) {
    return error(400, (e as Error).message);
  }
};
