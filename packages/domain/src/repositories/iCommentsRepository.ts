import { Comment } from "../../index";

export default interface ICommentRepository {
  get(id: string): Promise<Comment>;
  delete(id: string): Promise<Comment>;
  update(
    id: string,
    comment: Omit<Comment, "id" | "createdAt">
  ): Promise<Comment>;
  create(
    trackId: string,
    comment: Omit<Comment, "id" | "createdAt">
  ): Promise<Comment>;
  getByIds(ids: string[]): Promise<Comment[]>;
}
