import { app } from "./app";

function startServer() {
  app.listen(3002, () => {
    console.log("Server listening on port 3002");
  });
}

startServer();
