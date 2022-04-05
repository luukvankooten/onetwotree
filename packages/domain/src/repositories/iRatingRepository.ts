import Rate from "../entities/rating";

export default interface IRatingRepository {
  get(id: string): Promise<Rate>;
  create(trackId: string, rate: Omit<Rate, "id" | "createdAt">): Promise<Rate>;
  delete(id: string): Promise<Rate>;
  update(id: string, rate: Omit<Rate, "createdAt">): Promise<Rate>;
  getByUserId(id: string): Promise<Rate[]>;
}
