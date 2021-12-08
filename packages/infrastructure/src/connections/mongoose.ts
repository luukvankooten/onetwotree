import mongoose from "mongoose";

mongoose.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: (doc, converted) => {
    converted.id = converted._id;

    delete converted._id;
    delete converted.__v;
  },
});

const conn = mongoose.createConnection("mongodb://localhost:27017/comment");

export default conn;
