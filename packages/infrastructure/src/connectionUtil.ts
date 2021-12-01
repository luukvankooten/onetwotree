import mongoose from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

const conn = mongoose.createConnection("mongodb://localhost:27017/comment");

export default conn;
