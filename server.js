const express = require("express");
const routes = require("./server/routes");

// config
require("dotenv").config({ path: "./config/.env" });
require("./models");
const app = express();
app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("Listen on port:" + process.env.PORT);
});
