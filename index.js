import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/:lat/:lon", (req, res) => {

    const lat = req.params.lat;
    const lon = req.params.lon;
    const units = "metric";
    const api_key = process.env.WEATHER_API_KEY;
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)
    .then((response) => {
        res.send(response.data);
    }).catch((error) => {
        console.log(error);
    })
});