import { ConfigOptions } from "@src/interfaces";
import { config } from "dotenv-safe";
import os from "os";

config();

export default {
	PORT: process.env.PORT || 1234,
	MONGO_URI: process.env.MONGO_URI,
	HOST: process.env.HOST || "localhost",
	CPU_COUNT: os.cpus().length
} as ConfigOptions;
