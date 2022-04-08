import { Track } from "@12tree/domain";
import { RootState } from "../../app/store";
import {
  createComment,
  removeComment,
  updateComment,
} from "./comments/commentActions";
import trackSlice, {
  fetchTrack,
  fetchTrackBySpotifyId,
  getComments,
} from "./tracksSlice";

describe("track slice", () => {
  it("should fetch track", () => {
    const fakeTrack: Track = {
      id: "",
      spotifyId: "",
      name: "foo",
      artists: ["bar"],
      cover: "https://example.com",
      comments: [],
      ratings: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const action = {
      type: fetchTrack.fulfilled.type,
      payload: fakeTrack,
    };

    expect(trackSlice(undefined, action)).toEqual({
      tracks: [fakeTrack],
    });
  });

  it("should not fetch track because it already exists", () => {
    const fakeTrack: Track = {
      id: "55fa2860-f64d-4ee7-8ffe-fdcea924a93c",
      spotifyId: "",
      name: "foo",
      artists: ["bar"],
      cover: "https://example.com",
      comments: [],
      ratings: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const action = {
      type: fetchTrack.fulfilled.type,
      payload: fakeTrack,
    };

    expect(trackSlice({ tracks: [fakeTrack] }, action)).toEqual({
      tracks: [fakeTrack],
    });
  });

  it("should fetch track by spotifyId", () => {
    const fakeTrack: Track = {
      id: "",
      spotifyId: "55fa2860-f64d-4ee7-8ffe-fdcea924a93c",
      name: "foo",
      artists: ["bar"],
      cover: "https://example.com",
      comments: [],
      ratings: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const action = {
      type: fetchTrackBySpotifyId.fulfilled.type,
      payload: fakeTrack,
    };

    expect(trackSlice(undefined, action)).toEqual({
      tracks: [fakeTrack],
    });
  });

  it("should edit comments", () => {
    const fakeTrack: Track = {
      id: "",
      spotifyId: "55fa2860-f64d-4ee7-8ffe-fdcea924a93c",
      name: "foo",
      artists: ["bar"],
      cover: "https://example.com",
      comments: [
        {
          id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
          comment: "hhello",
          createdAt: Date.now(),
          user: {
            id: "bb657676-1a17-4a76-95de-2f350e6890ca",
            username: "foo",
            email: "foo@foo.com",
            name: "foo baz",
            friends: [],
          },
        },
      ],
      ratings: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const action = {
      type: updateComment.fulfilled,
      action: {
        id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
        comment: "ediit",
      },
      payload: {
        id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
        comment: "ediit",
        createdAt: Date.now(),
        user: {
          id: "bb657676-1a17-4a76-95de-2f350e6890ca",
          username: "foo",
          email: "foo@foo.com",
          name: "foo baz",
          friends: [],
        },
      },
    };

    const track = trackSlice({ tracks: [fakeTrack] }, action);

    expect(track.tracks[0].comments[0].comment).toBe("ediit");
  });

  it("should remove comments", () => {
    const fakeTrack: Track = {
      id: "",
      spotifyId: "55fa2860-f64d-4ee7-8ffe-fdcea924a93c",
      name: "foo",
      artists: ["bar"],
      cover: "https://example.com",
      comments: [
        {
          id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
          comment: "hhello",
          createdAt: Date.now(),
          user: {
            id: "bb657676-1a17-4a76-95de-2f350e6890ca",
            username: "foo",
            email: "foo@foo.com",
            name: "foo baz",
            friends: [],
          },
        },
      ],
      ratings: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const action = {
      type: removeComment.fulfilled,
      action: {
        id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
        comment: "ediit",
      },
      payload: {
        id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
        comment: "ediit",
        createdAt: Date.now(),
        user: {
          id: "bb657676-1a17-4a76-95de-2f350e6890ca",
          username: "foo",
          email: "foo@foo.com",
          name: "foo baz",
          friends: [],
        },
      },
    };

    const track = trackSlice({ tracks: [fakeTrack] }, action);

    expect(track.tracks[0].comments.length).toBe(0);
  });

  it("should create comments", () => {
    const fakeTrack: Track = {
      id: "55fa2860-f64d-4ee7-8ffe-fdcea924a93c",
      spotifyId: "",
      name: "foo",
      artists: ["bar"],
      cover: "https://example.com",
      comments: [],
      ratings: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const action = {
      type: createComment.fulfilled,
      action: {
        id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
        comment: "ediit",
      },
      meta: {
        arg: {
          trackId: "55fa2860-f64d-4ee7-8ffe-fdcea924a93c",
        },
      },
      payload: {
        id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
        comment: "ediit",
        createdAt: Date.now(),
        user: {
          id: "bb657676-1a17-4a76-95de-2f350e6890ca",
          username: "foo",
          email: "foo@foo.com",
          name: "foo baz",
          friends: [],
        },
      },
    };

    const track = trackSlice({ tracks: [fakeTrack] }, action);

    expect(track.tracks[0].comments[0]).toEqual(action.payload);
  });

  it("should get comment", () => {
    const fakeTrack: Track = {
      id: "55fa2860-f64d-4ee7-8ffe-fdcea924a93c",
      spotifyId: "",
      name: "foo",
      artists: ["bar"],
      cover: "https://example.com",
      comments: [
        {
          id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
          comment: "hhello",
          createdAt: Date.now(),
          user: {
            id: "bb657676-1a17-4a76-95de-2f350e6890ca",
            username: "foo",
            email: "foo@foo.com",
            name: "foo baz",
            friends: [],
          },
        },
      ],
      ratings: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const state = {
      tracks: {
        tracks: [fakeTrack],
      },
    } as RootState;

    expect(getComments("55fa2860-f64d-4ee7-8ffe-fdcea924a93c")(state)).toEqual([
      {
        id: "6f8209f3-0a93-445a-83ff-c1c21f9637c7",
        comment: "hhello",
        createdAt: Date.now(),
        user: {
          id: "bb657676-1a17-4a76-95de-2f350e6890ca",
          username: "foo",
          email: "foo@foo.com",
          name: "foo baz",
          friends: [],
        },
      },
    ]);
  });
});
