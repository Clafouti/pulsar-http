import type { User } from "../domain/user";
import type { UserRepositoryPort } from "../domain/user.repository.port";

export class UserService {
  constructor(private userRepository: UserRepositoryPort) {}

  async createUser(name: string, email: string): Promise<User> {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }
    return this.userRepository.createUser({
      id: "",
      name,
      email,
      createdAt: new Date(),
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
