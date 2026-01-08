import { useEffect, useState } from "react";

export default function useGeolocationPermission() {
	const [permission, setPermission] = useState(null);

	useEffect(() => {
		let permissionStatus;

		async function setup() {
			if (!navigator.permissions) {
				console.error("Geolocation is not supported by your browser");
				return;
			}

			permissionStatus = await navigator.permissions.query({
				name: "geolocation",
			});

			setPermission(permissionStatus.state);

			permissionStatus.addEventListener("change", () => {
				setPermission(permissionStatus.state);
			});
		}

		setup();

		return () => {
			if (permissionStatus) {
				permissionStatus.removeEventListener("change", () => {
					setPermission(permissionStatus.state);
				});
			}
		};
	}, []);

	return permission;
}
