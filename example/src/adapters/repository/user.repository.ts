import type { UserRepositoryPort } from "../../domain/user.repository.port";
import type { User } from "../../domain/user";
import { db } from "../../infrastructure/db";

export class UserRepository implements UserRepositoryPort {
  async createUser(user: User): Promise<User> {
    const result = await db.query(
      "INSERT INTO users (name, email, created_at) VALUES ($1, $2, $3) RETURNING *",
      [user.name, user.email, user.createdAt],
    );
    return result.rows[0];
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  }
}
