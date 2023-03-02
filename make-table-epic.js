const modal = new Modal(); // Defined in modal.js
const urlParams = new URLSearchParams(window.location.search);
const devMode = urlParams.has("dev");

// DOM nodes (I would call them elements, but you know)
const invalid = document.querySelector("#invalid");
const flashingLights = document.querySelector(`#flashing-lights > input[type="checkbox"]`);
const zalgoMessage = document.querySelector("#zalgo-message");
const lumion = document.querySelector("#lumion");
const elements = document.querySelectorAll("td:not(.blank):not(.junction)");

const noDescription = [ 22, 23, 24, 27, 29, 32, 33, 34, 35, 36.5, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67, 70, 71, 72, 73, 74, 75, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 117, 118];


function open(element) {
	// Placeholder; in the future may use the element's ID instead
	// const name = element.id;
	let name = element.querySelector(".name").textContent.toLowerCase();

	// Special case to make sure this "I" stays capitalized
	if (name === "dupiicatium") {
		name = "dupIicatium";
	}

	// Special case for Somewherum's lack of a number
	if (name === "somewherum") {
		modal.setURL(`info/somewherum.html`);
	} else {
		const atomicNumber = element.querySelector(".atomic-number").textContent.padStart(3, "0");
		modal.setURL(`info/${atomicNumber}-${name}.html`);
	}

	modal.openOver(element);
	window.location.hash = name;
}

modal.backdrop.addEventListener("click", () => {
	window.location.hash = "";
});


for (const element of elements) {
	if (!devMode && noDescription.includes(parseInt(element.querySelector(".atomic-number").textContent))) {
		// Temporary hack until all elements have descriptions
		continue;
	}

	if (!element.classList.contains("clickable")) {
		element.classList.add("clickable");
	}
	element.addEventListener("click", () => {
		open(element);
	});
}


document.addEventListener("DOMContentLoaded", () => {
	if (window.location.hash) {
		const elementsArray = Array.prototype.slice.call(elements); // Convert NodeList to Array
		const element = elementsArray.find(el => {
			return el.querySelector(".name").textContent.toLowerCase() === window.location.hash.substring(1);
		});
		if (element) {
			open(element);
		}
	}

	// When these elements get descriptions, their actions should be
	//   moved into their respective description pages.

	// Glow pink on click
	lumion.addEventListener("click", () => {
		lumion.classList.remove("anim-pink-glow");
		void lumion.offsetWidth;
		lumion.classList.add("anim-pink-glow");
	});

	// [REDACTED] on click
	invalid.addEventListener("click", () => {
		if (flashingLights.checked) {
			zalgoMessage.classList.remove("anim-flash");
			void invalid.offsetWidth; // Magic words that let you restart a CSS animation
			zalgoMessage.classList.add("anim-flash");
		} else {
			alert("YOU CAN NOT ESCAPE THE INEVITABLE");
		}
		doZalgo();
	});
});
