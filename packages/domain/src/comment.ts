import User from "./user";

export default interface Comment {
  user: User;
  comment: string;
  created: number;
}
