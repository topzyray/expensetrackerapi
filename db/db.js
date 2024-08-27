import mongoose from "mongoose";
import config from "../config/config.js";

const connectToDb = () => {
  mongoose
    .connect(config.DB_URL, {})
    .then((conn) => {
      console.log("DB Connected Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDb;
