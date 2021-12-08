import User, { UserInfo } from "../entities/user";

export default interface IUserReposistory {
  create(user: Omit<User, "friends">): Promise<User>;
  getByToken(token: string): Promise<User>;
  getWithToken(id: string): Promise<User>;
  get(id: string): Promise<UserInfo>;
  getByRefreshToken(token: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  delete(id: string): Promise<User>;
  update(user: User): Promise<User>;
}
