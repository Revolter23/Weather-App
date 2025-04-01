import { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

function Weather({ latitude, longitude }) {
	const [data, setData] = useState(null);

	let description = "";

	const baseUrl = import.meta.env.VITE_BASEURL + latitude + "/" + longitude;

	useEffect(() => {
		axios
			.get(baseUrl)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	}, []);
	// let description = data.current.weather[0].description;
	// const newDes = description.map(word => {word.charAt(0).toUpperCase() + word.slice(1)})

	return (
		<>
			{data && (
				// <p>{JSON.stringify(data)}</p>
				<>
					<div className="left-items weather ">
						<div className="left">
							<img
								src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
								alt="weather description image"
							/>
							<p id="description">
								{data.current.weather[0].description}
							</p>
							<p>{data.timezone}</p>
						</div>
						<div className="right">
							<p id="number">{data.current.temp}</p>
							<p>Feels Like {data.current.feels_like}</p>
						</div>
					</div>
					<div className="small weather">
						<div className="center-items">
							<p>Pressure</p>
							<p>Humidity</p>
							<p>Clouds</p>
							<p>Visibility</p>
							<p>Wind Speed</p>
						</div>
						<div className="right-items">
							<p>{data.current.pressure}</p>
							<p>{data.current.humidity}</p>
							<p>{data.current.clouds}</p>
							<p>{data.current.visibility}</p>
							<p>{data.current.wind_speed}</p>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Weather;
