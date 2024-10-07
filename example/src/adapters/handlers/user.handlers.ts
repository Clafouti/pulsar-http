import type { RouterHandler } from "pulsar-http";

import { UserService } from "../../application/user.service";
import { UserRepository } from "../repository/user.repository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const handleGetUsers: RouterHandler = async () => {
  const users = await userService.getAllUsers();
  return new Response(JSON.stringify(users), { status: 200 });
};

export const handleGetUser: RouterHandler = async (
  _,
  params: { id?: string },
) => {
  const id = params.id;

  if (!id) {
    return new Response("User ID is required", { status: 400 });
  }

  const user = await userService.getUserById(id);
  if (user) {
    return new Response(JSON.stringify(user), { status: 200 });
  } else {
    return new Response("User not found", { status: 404 });
  }
};

export const handleCreateUser: RouterHandler = async (request: Request) => {
  try {
    const { name, email } = await request.json();
    const user = await userService.createUser(name, email);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response((error as Error).message, { status: 400 });
  }
};
