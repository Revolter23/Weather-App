import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.scss";
import useGeolocationPermission from "../custom-hooks/useGeolocationPermission";
import Weather from "../component/Weather";
import Navbar from "../component/Navbar";
import {
	getCachedWeather,
	setCachedWeather,
	isCacheValid,
} from "../custom-hooks/getWeatherWithSWR";
import { use } from "react";

function App() {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [data, setData] = useState(null);

	const permission = useGeolocationPermission();
	let display = permission === "prompt" ? true : false;

	const navLocation = (ignore) => {
		function showPosition(position) {
			if (!ignore) {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			}
		}

		function showError(error) {
			console.error("Error obtaining location:", error);
		}

		if (!navigator.geolocation) {
			console.error("Geolocation is not supported by your browser");
		} else {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		}
	};

	const ipLocation = (signal, ignore) => {
		axios
			.get("https://ipapi.co/json/", {
				signal,
			})
			.then((response) => {
				if (!ignore) {
					setLatitude(response.data.latitude);
					setLongitude(response.data.longitude);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		const controller = new AbortController();
		let ignore = false;

		if (permission === "granted") {
			if (!ignore) {
				navLocation(ignore);
			}
		} else if (permission === "denied") {
			if (!ignore) {
				ipLocation(controller.signal, ignore);
			}
		} else if (permission === "prompt") {
			if (!ignore) {
				ipLocation(controller.signal, ignore);
			}
		}

		return () => {
			ignore = true;
			controller.abort();
		};
	}, [permission]);

	const serverRequest = async (latitude, longitude, signal) => {
		if (latitude && longitude) {
			const baseUrl =
				import.meta.env.VITE_BASEURL + latitude + "/" + longitude;

			const response = await axios.get(baseUrl, {
				signal,
			});

			return response.data;
		}
	};

	async function getWeatherWithSWR(lat, lon, controller, ignore) {
		if (!lat || !lon || ignore) return;

		const cached = getCachedWeather();

		if (cached) {
			setData(cached.data);

			if (isCacheValid(cached)) {
				return;
			}
		}

		try {
			const newData = await serverRequest(lat, lon, controller.signal);

			setCachedWeather(newData);
			setData(newData);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	}

	useEffect(() => {
		const controller = new AbortController();
		let ignore = false;

		getWeatherWithSWR(latitude, longitude, controller, ignore);

		return () => {
			ignore = true;
			controller.abort();
		};
	}, [latitude, longitude]);

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

			if (weatherCode === 800) {
				document.getElementsByClassName(
					"container"
				)[0].style.backgroundImage = `url(${map[weatherCode]})`;
			} else {
				const categoryCode = Number(weatherCode.toString()[0]);
				document.getElementsByClassName(
					"container"
				)[0].style.backgroundImage = `url(${map[categoryCode]})`;
			}
		} catch (error) {
			console.error(error);
		}
	}

	function handlePrecision() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			},
			(error) => {
				console.error("Error obtaining location:", error);
			}
		);
	}

	return (
		<div className="container">
			<div className="navbar">
				<Navbar handlePrecision={handlePrecision} display={display} />
			</div>
			<Weather data={data} />
		</div>
	);
}

export default App;
