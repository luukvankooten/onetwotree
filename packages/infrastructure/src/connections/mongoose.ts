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

let conn: mongoose.Connection | undefined;

export async function close() {
  if (!conn) {
    return;
  }

  await conn.close();
}

export default (url: string) => {
  conn = mongoose.createConnection(url);

  return conn;
};
