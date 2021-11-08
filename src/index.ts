// connect to db and start up express app
import mongoose from "mongoose";
import config from "@src/config";
import app from "@src/app";
import cluster from "cluster";

mongoose
	.connect(config.MONGO_URI)
	.then(() => {
		if (cluster.isPrimary) {
			// if we are here its the primary process
			for (let i = 0; i < config.CPU_COUNT; i++) {
				// spawn new child process / worker process
				cluster.fork();
			}
		} else if (cluster.isWorker) {
			// if we are here its a worker process
			// listen for requests
			app.listen(config.PORT, config.HOST, (): void =>
				console.log(
					`Server worker::${process.pid} is listening on http://${config.HOST}:${config.PORT}`
				)
			);
		}
	})
	.catch(err => {
		console.error(
			`Error connecting to db:: Error_Name::${err.name} Error_Message::${err.message} `
		);
		process.exit(1);
	});
