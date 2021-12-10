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

export default (url: string) => mongoose.createConnection(url);
