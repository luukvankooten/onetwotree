import Comment from "../entities/comment";

type OmittedComment = Omit<Comment, "user">;
export default interface ICommentRepository {
  get(id: string): Promise<OmittedComment | undefined>;
  getAll(): Promise<OmittedComment[]>;
  delete(id: string): Promise<boolean>;
  update(
    id: string,
    comment: Partial<Omit<Comment, "user">>
  ): Promise<OmittedComment | undefined>;
}
