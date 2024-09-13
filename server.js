const { app, server } = require("./app");
const db = require("./database");
db.once("open", function () {
  console.log("Open connection to database: ", db.name);
});
db.on(
  "error",
  console.error.bind(console, "Connection error.")
);

require("./database/seeders")();
