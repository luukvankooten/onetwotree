// import { Comment } from "@12tree/domain";

// describe("comment slice", () => {
//   it("should add comment", () => {
//     const initialState: commentState = {
//       comments: [],
//     };

//     let comment: Comment = {
//       id: "13855980-5155-48b1-a893-1b4ab9ff0d5b",
//       user: {
//         id: "044bad47-6c97-4272-9076-e5b7b056b0fd",
//         username: "foo",
//         email: "foo@foo.com",
//         name: "foo baz",
//         friends: [],
//       },
//       comment: "foo baz bar",
//       createdAt: Date.now(),
//     };
//     expect(commentSlice(initialState, add(comment)).comments).toContainEqual(
//       comment
//     );
//   });

//   it("should update comment", () => {
//     const initialState: commentState = {
//       comments: [
//         {
//           id: "166069c6-f331-4e66-abfb-909c535fe345",
//           user: {
//             id: "f530443b-cabf-40fc-bfa0-9ef0b420e5b2",
//             username: "foo",
//             email: "foo@foo.com",
//             name: "foo baz",
//             friends: [],
//           },
//           comment: "Should be edited",
//           createdAt: Date.now(),
//         },
//       ],
//     };

//     const updatedComment = commentSlice(
//       initialState,
//       edit({
//         index: 0,
//         comment: "Update comment",
//       })
//     ).comments[0].comment;

//     expect(updatedComment).toBe("Update comment");
//   });

//   it("should remove comment", () => {
//     const shouldNotBeRemoved = {
//       id: "166069c6-f331-4e66-abfb-909c535fe345",
//       user: {
//         id: "56688f3d-8a92-48cc-8e26-baead21aafa0",
//         username: "baz",
//         email: "baz@foo.com",
//         name: "foo baz",
//         friends: [],
//       },
//       comment: "This comment should not be removed",
//       createdAt: Date.now(),
//     };

//     const initialState: commentState = {
//       comments: [
//         {
//           id: "e7b0a07c-0d9c-4087-ad26-d5da25d4b840",
//           user: {
//             id: "b1e8d9af-d759-43cb-bbcb-0654a1965ae3",
//             username: "foo",
//             email: "foo@foo.com",
//             name: "foo baz",
//             friends: [],
//           },
//           comment: "Should be removed",
//           createdAt: Date.now(),
//         },
//         shouldNotBeRemoved,
//       ],
//     };

//     expect(commentSlice(initialState, remove(0)).comments).toContainEqual(
//       shouldNotBeRemoved
//     );
//   });
// });
