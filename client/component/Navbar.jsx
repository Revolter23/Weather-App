import React from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function Navbar({ display, handlePrecision }) {
	return (
		<div className={`nav ${!display ? "center" : ""}`}>
			<div id="title">
				<CloudIcon sx={{ fontSize: "2rem" }} className="Icon" />
				<p>Weather App</p>
			</div>
			{display && (
				<button onClick={handlePrecision}>
					<MyLocationIcon id="locIcon" />
					<p>Use Precise Location</p>
				</button>
			)}
		</div>
	);
}
