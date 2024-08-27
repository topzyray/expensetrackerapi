import app from "./app.js";
import config from "./config/config.js";
import connectToDb from "./db/db.js";

connectToDb()

app.listen(config.PORT, () => {
  console.log(`Server is listening on ${config.PORT}!`);
});
