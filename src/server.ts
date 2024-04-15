import { createServer } from "./index";
require("dotenv").config();

const startServer = async () => {
  const app = await createServer(); // Specify the type of app as Express
  // Run server on server port
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
  });
};

startServer();
