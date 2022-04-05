import { useForm } from "react-hook-form";
import { Comment } from "@12tree/domain";
import { useAppDispatch } from "../../../../app/hooks";
import { updateComment } from "../commentActions";
import OutletComment from "./OutletComment";

type FormData = {
  comment: string;
};

type EditProps = {
  index: number;
  toggle: () => void;
  comment: Comment;
};

export default function Edit({ index, toggle, comment }: EditProps) {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      comment: comment.comment,
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit((data) => {
    dispatch(updateComment({ id: comment.id, comment: data.comment }));

    toggle();
  });

  return (
    <OutletComment register={() => register("comment")} onSubmit={onSubmit} />
  );
}
