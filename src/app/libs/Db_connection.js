import mongoose from "mongoose";

export const Db_connection = async () => {
  try {
    const moogob_url = process.env.mongodb_url;
    const connection = mongoose.connect(moogob_url, {
      dbName: "Task",
    });

    console.log("===========================")
  } catch (error) {
    console.log(error);
  }
};
