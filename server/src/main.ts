import { config } from "dotenv";
import { ActivityHandler } from "./routes/ActivityHandler";
import { RootHandler } from "./routes/RootHandler";
import { Server } from "./server";

config();
const port = process.env.PORT || 3000;

new RootHandler();
new ActivityHandler();
new Server(port);
