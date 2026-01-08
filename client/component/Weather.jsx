import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.scss";

function Weather({ data }) {
	return (
		<>
			{/* <p>{JSON.stringify(data)}</p> */}
			<main id="content">
				<div className="left-items glass-sm">
					<div className="left glass">
						{data ? (
							<img
								id="weather-icon"
								src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
								alt="weather description image"
							/>
						) : (
							<div className="skeleton-image"></div>
						)}

						{data ? (
							<p id="description">
								{data.current.weather[0].description}
							</p>
						) : (
							<div className="skeleton-description"></div>
						)}

						{data ? (
							<p>{data.timezone}</p>
						) : (
							<div className="skeleton-p"></div>
						)}
					</div>
					<div className="right glass">
						{data ? (
							<p id="number">{data.current.temp} *C</p>
						) : (
							<div className="skeleton-temp"></div>
						)}

						{data ? (
							<p>Feels Like {data.current.feels_like} *C</p>
						) : (
							<div className="skeleton-p"></div>
						)}
					</div>
				</div>
				<div className="small">
					<div className="glass-sm" id="top">
						<div className="tiles glass" id="pressure-tile">
							{data ? (
								<>
									<p className="nums">
										{data.current.pressure} hPa
									</p>
									<p>Pressure</p>
								</>
							) : (
								<>
									<div className="skeleton-nums"></div>
									<div className="skeleton-nums"></div>
								</>
							)}
						</div>
						<div className="tiles glass" id="wind-tile">
							{data ? (
								<>
									<p className="nums">
										{data.current.wind_speed} m/s
									</p>
									<p>Wind Speed</p>
								</>
							) : (
								<>
									<div className="skeleton-nums"></div>
									<div className="skeleton-nums"></div>
								</>
							)}
						</div>
						<div className="tiles glass">
							{data ? (
								<>
									<p className="nums">
										{data.current.humidity} %
									</p>
									<p>Humidity</p>
								</>
							) : (
								<>
									<div className="skeleton-nums"></div>
									<div className="skeleton-nums"></div>
								</>
							)}
						</div>
					</div>
					<div className="glass-sm" id="bottom">
						<div className="tiles glass" id="cloud-tile">
							{data ? (
								<>
									<p className="nums">
										{data.current.clouds} %
									</p>
									<p>Clouds</p>
								</>
							) : (
								<>
									<div className="skeleton-nums"></div>
									<div className="skeleton-nums"></div>
								</>
							)}
						</div>
						<div className="tiles glass">
							{data ? (
								<>
									<p className="nums">
										{data.current.visibility}
									</p>
									<p>metres</p>
									<p>Visibility</p>
								</>
							) : (
								<>
									<div className="skeleton-nums"></div>
									<div className="skeleton-nums"></div>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default Weather;
