import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import seedSuperAdmin from "./app/db";

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });

    // const mongodbUri = config.NODE_ENV === 'production' ? config.database_url as string : 'mongodb://localhost:27017/fitnessEcommerce';
    const mongodbUri = config.database_url as string;

    await mongoose.connect(mongodbUri);

    console.log("Database connection successfull.");

    seedSuperAdmin();
  } catch (err) {
    console.log("Database connectoin lost.");
    console.log("Error: ", err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 UnahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 UncaughtException is detected , shutting down ...`);
  process.exit(1);
});
