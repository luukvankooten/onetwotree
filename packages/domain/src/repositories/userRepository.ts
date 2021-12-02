import User from "../entities/user";

export default interface IUserReposistory {
  create(user: User): Promise<User>;
  get(id: string): Promise<User | undefined>;
}
