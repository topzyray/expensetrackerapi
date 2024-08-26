import app from "./app.js";
import config from "./config/config.js";

app.listen(config.PORT, () => {
  console.log(`Server is listening on ${config.PORT}!`);
});
