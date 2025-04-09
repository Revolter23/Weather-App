import express from "express";
import bodyParser from "body-parser";
// import "dotenv/config";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

app.get("/:lat/:lon", (req, res) => {
	const lat = req.params.lat;
	const lon = req.params.lon;
	const units = "metric";
	const apiKey = process.env.SECRET_KEY;
	const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}&units=${units}`;
	// console.log(lat, lon);
	// console.log(apiKey);
	// console.log(url);
	axios
		.get(url)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
});
