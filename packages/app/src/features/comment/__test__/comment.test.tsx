import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { Comment } from "@12tree/domain";
import Show from "../components/Show";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { add, selectComment } from "../commentSlice";

describe("comment test", () => {
  it("should toggle edit mode and save", async () => {
    const comment: Comment = {
      user: {
        username: "foo",
        email: "foo@foo.com",
        token: "",
        name: "foo baz",
      },
      comment: "foo baz bar",
      created: Date.now(),
    };

    store.dispatch(add(comment));

    const index = store.getState().comment.comments.indexOf(comment);

    const { getByTestId } = render(
      <Provider store={store}>
        <Show index={index} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Wijzigen"));

    const value =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    const commentInput = getByTestId("comment");

    fireEvent.change(commentInput, { target: { value } });

    await waitFor(() => expect(commentInput).toHaveValue(value));
    const submit = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(submit);
    });

    expect(screen.getByTestId("comment-show")).toHaveTextContent(value);
    expect(store.getState().comment.comments[index].comment).toBe(value);
  });
});
