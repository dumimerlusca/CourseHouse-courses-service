import { app } from "./app";
import { prisma } from "./prisma-client";

async function startServer() {
  await prisma.$connect();
  console.log("Connected to database");

  app.listen(3003, () => {
    console.log("Server listening on port 3003");
  });
}

startServer();
