import commentSlice, { add, commentState, edit, remove } from "../commentSlice";

describe("comment slice", () => {
  it("should add comment", () => {
    const initialState: commentState = {
      comments: [],
    };

    let comment = {
      user: {
        username: "foo",
        email: "foo@foo.com",
        token: "",
        name: "foo baz",
      },
      comment: "foo baz bar",
      createdAt: Date.now(),
    };
    expect(commentSlice(initialState, add(comment)).comments).toContainEqual(
      comment
    );
  });

  it("should update comment", () => {
    const initialState: commentState = {
      comments: [
        {
          user: {
            username: "foo",
            email: "foo@foo.com",
            token: "",
            name: "foo baz",
          },
          comment: "Should be edited",
          createdAt: Date.now(),
        },
      ],
    };

    const updatedComment = commentSlice(
      initialState,
      edit({
        index: 0,
        comment: "Update comment",
      })
    ).comments[0].comment;

    expect(updatedComment).toBe("Update comment");
  });

  it("should remove comment", () => {
    const shouldNotBeRemoved = {
      user: {
        username: "baz",
        email: "baz@foo.com",
        token: "",
        name: "foo baz",
      },
      comment: "This comment should not be removed",
      createdAt: Date.now(),
    };

    const initialState: commentState = {
      comments: [
        {
          user: {
            username: "foo",
            email: "foo@foo.com",
            token: "",
            name: "foo baz",
          },
          comment: "Should be removed",
          createdAt: Date.now(),
        },
        shouldNotBeRemoved,
      ],
    };

    expect(commentSlice(initialState, remove(0)).comments).toContainEqual(
      shouldNotBeRemoved
    );
  });
});
