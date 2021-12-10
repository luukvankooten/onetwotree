import { Rate, UserInfo } from "@12tree/domain";
import { MongoRate } from "../schemas/rating";

export async function mapPropsToRate(
  rate: MongoRate,
  user: UserInfo
): Promise<Rate> {
  return {
    id: rate.id,
    rating: rate.rating,
    user,
    createdAt: rate.createdAt,
    updatedAt: rate.updatedAt,
  };
}
