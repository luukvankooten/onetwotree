import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Show from "../components/Show";
import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import { Status } from "../../../auth/authSlice";
import * as domain from "@12tree/domain";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

describe("comment test", () => {
  it("should toggle edit mode and save and delete", async () => {
    const mockStore = configureStore([thunk]);
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const comment: domain.Comment = {
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
    };

    const store = mockStore({
      auth: {
        load: {
          status: Status.AUTHENICATED,
          user: {
            id: "bb657676-1a17-4a76-95de-2f350e6890ca",
            username: "foo",
            email: "foo@foo.com",
            name: "foo baz",
            friends: [],
            token: {
              accessToken: "",
              refreshToken: "",
              expiresIn: 1649148903967,
              createdAt: 1649148903967,
            },
          },
        },
      },
      tracks: [
        {
          id: "7b4f70bc-70f6-482d-933c-a2521d6d14c2",
          comments: [comment],
          ratings: [],
        },
      ],
    });

    const { getByTestId } = render(
      <BrowserRouter>
        <redux.Provider store={store}>
          <Show index={1} comment={comment} />
        </redux.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("🖊"));

    const value =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    const commentInput = getByTestId("comment");

    fireEvent.change(commentInput, { target: { value } });

    await waitFor(() => expect(commentInput).toHaveValue(value));
    const submit = screen.getByText("👍");
    comment.comment = value;

    fireEvent.submit(submit);

    await waitFor(() =>
      expect(screen.getByTestId("comment-show").textContent).toBe(value)
    );

    fireEvent.click(screen.getByText("🖊"));
    const editValue = "edited";

    fireEvent.change(getByTestId("comment"), { target: { editValue } });
    comment.comment = editValue;

    fireEvent.submit(screen.getByText("👍"));

    await waitFor(() =>
      expect(screen.getByTestId("comment-show").textContent).toBe(editValue)
    );

    const remove = screen.getByText("🗑");
    fireEvent.submit(remove);
  });
});
