import User from "../entities/user";

export default interface IUserReposistory {
  create(user: Omit<User, "friends">): Promise<User | undefined>;
  getByToken(token: string): Promise<User | undefined>;
  get(id: string): Promise<User | undefined>;
  getByRefreshToken(token: string): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
}
