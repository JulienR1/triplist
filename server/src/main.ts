import { config } from "dotenv";
import { ActivityHandler, CategoryHandler, ItemHandler, RootHandler } from "./routes/handlers";
import { Server } from "./server";

config();
const port = process.env.PORT || 3000;

new RootHandler();
new ActivityHandler();
new CategoryHandler();
new ItemHandler();
new Server(port);
