import {
  IRatingReposistory,
  IUserReposistory,
  NotFoundError,
} from "@12tree/domain";
import { Rate } from "@12tree/domain";
import { MongooseModels } from "./schemas";
import { mapPropsToRate } from "./mappers";

export default function (
  { RateModel, TrackModel }: MongooseModels,
  userRepo: IUserReposistory
): IRatingReposistory {
  async function get(id: string): Promise<Rate> {
    const rate = await RateModel.findById(id);

    if (!rate) {
      throw new NotFoundError();
    }

    return mapPropsToRate(rate, await userRepo.get(rate.user_id));
  }

  async function create(trackId: string, rate: Omit<Rate, "id">) {
    const track = await TrackModel.findById(trackId);

    console.log(track);
    if (!track) {
      throw new NotFoundError();
    }

    const newRate = new RateModel({
      rating: rate.rating,
      user_id: rate.user.id,
    });

    await newRate.save();

    track.comments.push(newRate._id);

    return mapPropsToRate(newRate, await userRepo.get(rate.user.id));
  }

  async function update(id: string, rate: Omit<Rate, "createdAt">) {
    const updateRate = await RateModel.findByIdAndUpdate(
      rate.id,
      {
        rating: rate.rating,
      },
      { new: true }
    );

    if (!updateRate) {
      throw new NotFoundError();
    }

    await updateRate.save();

    return mapPropsToRate(updateRate, rate.user);
  }

  async function remove(id: string) {
    const deletedRate = await RateModel.findByIdAndRemove(id);

    if (!deletedRate) {
      throw new NotFoundError();
    }

    await deletedRate.save();

    return mapPropsToRate(deletedRate, await userRepo.get(deletedRate.user_id));
  }

  return { get, create, update, delete: remove };
}
