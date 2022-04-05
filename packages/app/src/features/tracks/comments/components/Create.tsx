import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../app/hooks";
import { createComment } from "../commentActions";
import OutletComment from "./OutletComment";

type FormData = {
  comment: string;
};

interface CreateCommentProps {
  trackId: string;
}

export default function Create({ trackId }: CreateCommentProps) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit((data) => {
    dispatch(createComment({ trackId, comment: data.comment }));
    reset();
  });

  return (
    <OutletComment register={() => register("comment")} onSubmit={onSubmit} />
  );
}
