function setCookie(name, value) {
	const cookieValue = `${name}=${value}`;
	document.cookie = cookieValue;
	return cookieValue;
}

function getCookie(name) {
	const thing = document.cookie.split("; ")
		.find(row => row.startsWith(name));

	if (thing) {
		return thing.split("=")[1];
	}
}


document.addEventListener("DOMContentLoaded", () => {
	const flashingLights = document.querySelector(`#flashing-lights > input[type="checkbox"]`);
	flashingLights.checked = getCookie("flashing-lights");

	flashingLights.addEventListener("beforeunload", () => {
		if (flashingLights.checked != getCookie("flashing-lights")) {
			setCookie("flashing-lights", flashingLights.checked);
		}
	});
});
