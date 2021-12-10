import {
  ITrackReposistory,
  Track,
  SearchTrack,
  NotFoundError,
  IUserReposistory,
} from "@12tree/domain";
import { mapPropsToTrack } from "./mappers";
import SpotifyWebApi from "spotify-web-api-node";
import { MongooseModels } from "./schemas";

const searchedResults: SearchTrack[] = [];

//Due: to rate limit cache

if (process.env.NODE_ENV !== "test") {
  setInterval(() => {
    searchedResults.length = 0;
  }, 30000);
}

export default function (
  { TrackModel }: MongooseModels,
  SpotifyApiConnection: Promise<SpotifyWebApi>,
  userRepo: IUserReposistory
): ITrackReposistory {
  async function search(query: string) {
    try {
      const api = await SpotifyApiConnection;

      const tracks = await api.searchTracks(`track:${query}`);

      console.log("from api");

      const searched =
        tracks.body.tracks?.items.map((item) => ({
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          cover: item.album.images.shift()?.url,
        })) || [];

      searchedResults.push(...searched);
    } catch (err) {
      const filter = searchedResults.filter((item) =>
        item.name.includes(query)
      );

      if (filter.length >= 1) {
        console.log("chached");
        return filter;
      }
    }

    return searchedResults;
  }

  async function findBySpotifyId(spotifyId: string): Promise<Track> {
    const findTrack = await TrackModel.findOne({ spotifyId })
      .populate("comments")
      .populate("ratings");

    if (!findTrack) {
      return create(spotifyId);
    }

    return mapPropsToTrack(findTrack, userRepo);
  }

  async function get(id: string): Promise<Track> {
    const findTrack = await TrackModel.findById(id)
      .populate("comments")
      .populate("ratings");

    if (!findTrack) {
      throw new NotFoundError("Not found");
    }

    return mapPropsToTrack(findTrack, userRepo);
  }

  async function create(id: string) {
    const api = await SpotifyApiConnection;
    const spotifyTrack = await api.getTrack(id);

    if (spotifyTrack.statusCode !== 200) {
      throw new NotFoundError(`Spotify Track doesn't exists with id: ${id}`);
    }

    const body = spotifyTrack.body;

    const newTrack = new TrackModel({
      spotifyId: body.id,
      name: body.name,
      artists: body.artists.map((artist) => artist.name),
      cover: body.album.images.shift()?.url || "",
    });

    const track = await newTrack.save();

    return mapPropsToTrack(track, userRepo);
  }

  async function update(track: Track) {
    const trackFound = await TrackModel.findOneAndUpdate(
      { id: track.id },
      {
        name: track.name,
        artists: track.artists,
        cover: track.cover,
      },
      { new: true }
    );

    if (!trackFound) {
      throw new NotFoundError(`Track not found with id: ${track.id}`);
    }

    await trackFound.save();

    return await mapPropsToTrack(trackFound, userRepo);
  }

  async function remove(id: string) {
    const track = await TrackModel.findByIdAndDelete(id);

    if (!track) {
      throw new NotFoundError(`Track not found with id: ${id}`);
    }

    return mapPropsToTrack(track, userRepo);
  }

  return { search, get, update, delete: remove, create, findBySpotifyId };
}
