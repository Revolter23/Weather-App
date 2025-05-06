import { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

function Weather({ latitude, longitude }) {
	const [data, setData] = useState(null);

	const baseUrl = import.meta.env.VITE_BASEURL + latitude + "/" + longitude;

	useEffect(() => {
		axios
			.get(baseUrl)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (data) {
			try {
				const map = {
					800: "/sunny day.jpg",
					8: "/cloudy image.jpg",
					5: "/rainy day.jpeg",
					2: "/thunderstorm image.webp",
					7: "/mist.jpeg",
				};

				const weatherCode = data.current.weather[0].id;

				console.log(weatherCode);
				if (weatherCode === 800) {
					document.body.style.backgroundImage = `url(${map[weatherCode]})`;
				} else {
					const categoryCode = Number(weatherCode.toString()[0]);
					console.log(categoryCode);
					document.body.style.backgroundImage = `url(${map[categoryCode]})`;
				}
			} catch (error) {
				console.log(error);
			}
		}
	}, [data]);

	return (
		<>
			{data && (
				// <p>{JSON.stringify(data)}</p>
				<div id="content">
					<div className="left-items glass-sm">
						<div className="left glass">
							<img
								id="weather-icon"
								src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
								alt="weather description image"
							/>
							<p id="description">
								{data.current.weather[0].description}
							</p>
							<p>{data.timezone}</p>
						</div>
						<div className="right glass">
							<p id="number">{data.current.temp} *C</p>
							<p>Feels Like {data.current.feels_like} *C</p>
						</div>
					</div>
					<div className="small">
						<div className="glass-sm" id="top">
							<div className="tiles glass" id="pressure-tile">
								<p className="nums">
									{data.current.pressure} hPa
								</p>
								<p>Pressure</p>
							</div>
							<div className="tiles glass" id="wind-tile">
								<p className="nums">
									{data.current.wind_speed} m/s
								</p>
								<p>Wind Speed</p>
							</div>
							<div className="tiles glass">
								<p className="nums">
									{data.current.humidity} %
								</p>
								<p>Humidity</p>
							</div>
						</div>
						<div className="glass-sm" id="bottom">
							<div className="tiles glass" id="cloud-tile">
								<p className="nums">{data.current.clouds} %</p>
								<p>Clouds</p>
							</div>
							<div className="tiles glass">
								<p className="nums">
									{data.current.visibility}
								</p>
								<p>metres</p>
								<p>Visibility</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Weather;
