import { config } from "dotenv";
import { ActivityHandler, CategoryHandler, RootHandler } from "./routes/handlers";
import { Server } from "./server";

config();
const port = process.env.PORT || 3000;

new RootHandler();
new ActivityHandler();
new CategoryHandler();
new Server(port);
