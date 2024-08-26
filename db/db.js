import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../logging/logger.js";

const connectToDb = () => {
  mongoose
    .connect(config.DB_URL, {})
    .then((conn) => {
      logger.info("DB Connected Successfully");
    })
    .catch((error) => {
      logger.error(error);
    });
};

export default connectToDb;
