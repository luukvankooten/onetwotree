import * as domain from "@12tree/domain";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { default as ShowComment } from "../features/tracks/comments/components/Show";
import { useApi } from "../hooks/useApi";
import RatingCard from "../components/Layout/RatingCard";
import {
  fetchTrack,
  getUserComments,
  getUserRatings,
} from "../features/tracks/tracksSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Loading } from "../components/Loading";
import { default as InfoUser } from "../components/User";
import useToggle from "../hooks/useToggle";
import Button from "../components/Button/Button";
import { getUser } from "../features/auth/authSlice";

export default function User() {
  const { id } = useParams();
  const user = useApi<domain.User>(`users/${id}`);
  const tracksIds = useApi<string[]>(`users/${id}/tracks`);
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getUserComments(`${id}`));
  const ratings = useAppSelector(getUserRatings(`${id}`));
  const [value, toggle] = useToggle();
  const { id: userId } = useAppSelector(getUser);

  useEffect(() => {
    if (tracksIds.status === "loading") {
      return;
    }

    tracksIds.payload.map((id) => dispatch(fetchTrack(id)));
  });

  if (user.status === "loading") {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 p-6 rounded">
      <div className="mb-6">
        <div className="mb-4 rounded bg-white p-2 shadow-lg flex items-stretch">
          <div className="font-bold text-xl w-1/2 flex items-center">
            Account
          </div>
          <div className="text-right w-1/2">
            {user.payload.id === userId && (
              <>
                <Button
                  onClick={() => toggle()}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  🖊
                </Button>
                <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  🗑
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="rounded bg-white p-2 shadow-lg">
          <InfoUser user={user.payload} editMode={value} toggle={toggle} />
        </div>
      </div>
      <div className="mb-6">
        <div className="font-bold text-xl mb-4 rounded bg-white p-2 shadow-lg">
          Gegeven opmerkingen
        </div>
        <div className="flex flex-wrap -mx-2 -my-2">
          {comments.map((comment, key) => (
            <div className="w-1/2 my-2 px-2" key={key}>
              <ShowComment index={key} comment={comment} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="font-bold text-xl mb-4 rounded bg-white p-2 shadow-lg">
          Recenties
        </div>
        <div className="flex -mx-2 -mb-2 flex-wrap">
          {ratings.map((rates, key) => (
            <div key={key} className="w-1/3 px-2 pb-4">
              <RatingCard rate={rates} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
