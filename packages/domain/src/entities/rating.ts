import { UserInfo } from "./user";

export enum Rating {
  ONE,
  TWO,
  TRHEE,
  FOUR,
  FIVE,
}
export default interface Rate {
  id: string;
  rating: Rating;
  user: UserInfo;
  createdAt: number;
  updatedAt?: number;
}
