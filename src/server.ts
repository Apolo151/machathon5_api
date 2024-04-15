const app = require("./index");

require("dotenv").config();

// Run server on server port
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
