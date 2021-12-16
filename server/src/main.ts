import { config } from "dotenv";
import { routes } from "./routes";
import { Server } from "./server";

config();
const port = process.env.PORT || 3000;
new Server(port, routes);
