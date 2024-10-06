import { error404, file, json, type RouterHandler } from "pulsar-http";
import { faker } from "@faker-js/faker";

let fakeUsers = Array.from({ length: 10 }, () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
});

export const handleHome: RouterHandler = async () =>
  file("/public/hello-world.html");

export const handleGetUsers: RouterHandler = async () => json(fakeUsers);

export const handleGetUser: RouterHandler = async (
  _,
  params: {
    id?: string;
  },
) => {
  const user = fakeUsers.find((user) => {
    return user.id === params.id;
  });

  if (!user) {
    return error404();
  }

  return json(user);
};

export const handleCreateUser: RouterHandler = async (request) => {
  if (!request.body) {
    return new Response("Bad Request", { status: 400 });
  }

  const body = await request.json();

  // Check if the body is a valid UserBody
  if (!body.username || !body.email || !body.firstName || !body.lastName) {
    return new Response("Bad Request", { status: 400 });
  }

  // Check if the username is already taken
  if (fakeUsers.some((user) => user.username === body.username)) {
    return new Response("Conflict", { status: 409 });
  }

  // Check if the email is already taken
  if (fakeUsers.some((user) => user.email === body.email)) {
    return new Response("Conflict", { status: 409 });
  }

  // Add the user to the list of users
  const user = {
    id: faker.string.uuid(),
    ...body,
  };

  fakeUsers.push(user);

  return json(user);
};
