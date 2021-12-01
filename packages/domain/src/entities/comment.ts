import User from "./user";

export default interface Comment {
  id: string;
  user: User;
  comment: string;
  createdAt: Number;
  updatedAt?: Number;
}
