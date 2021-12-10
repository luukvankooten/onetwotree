import { UserInfo } from "./user";

export default interface Comment {
  id: string;
  user: UserInfo;
  comment: string;
  createdAt: Number;
  updatedAt?: Number;
}
