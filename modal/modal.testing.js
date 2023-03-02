/**
 * Super-epic and cool custom modal!!
 */
class Modal {
	constructor() {
		// Set up the modal itself
		this.modal = document.createElement("div");
		this.modal.classList.add("modal-main");

		// Set up the modal's content (an iframe with the description page inside)
		this.iframe = document.createElement("iframe");
		this.iframe.classList.add("modal-iframe");
		this.iframe.src = "about:blank";

		// Set up the dark backdrop
		this.backdrop = document.createElement("div");
		this.backdrop.classList.add("modal-backdrop");
		this.backdrop.addEventListener("click", () => {
			this.close();
		});

		// Add a close button
		this.closeButton = document.createElement("div");
		this.closeButton.classList.add("modal-close-button");
		this.closeButton.addEventListener("click", () => {
			this.close();
		});

		// Hide everything by default
		this.hide();

		// The modal's dimensions can vary based on the size of the viewport.
		//   This makes sure modal.js always knows its dimensions for sure.
		this.modalRect = this.modal.getBoundingClientRect();
		window.addEventListener("resize", () => {
			this.modalRect = this.modal.getBoundingClientRect();
		}, {
			passive: true
		});

		this.modal.appendChild(this.iframe);
		this.modal.appendChild(this.closeButton);
		document.body.appendChild(this.backdrop);
		document.body.appendChild(this.modal);
	}


	// Set the URL to use as the source of the iframe inside the modal.
	setURL(url) {
		if (url !== this.currentURL) {
			this.iframe.src = url;
			this.currentURL = url;
		}
	}


	// Appear on top of the clicked element and zoom into the center of the screen.
	openOver(el) {
		this.setClickedElement(el)
		this.unzoom(true);
		this.show();
		this.zoom(false);
	}


	// Zoom back to the clicked element and hide the modal.
	close() {
		this.unzoom(false);

		// Triggers when unzoom's action finishes.
		// this.iframe.addEventListener("transitionend", () => {
		// 	this.hide();
		// }, {
		// 	once: true
		// });

		this.hide();
	}


	// Make sure to do this before overwriting an instance of this class!
	kill() {
		this.modal.remove();
		this.backdrop.remove();
	}


	/********* Private methods (or as private as they get in JS) ********/

	// Put the modal over this element.
	setClickedElement(el) {
		this.clickedElementRect = el.getBoundingClientRect();
		const { width, height, left, top } = this.clickedElementRect;

		// Calculate factors by which to resize, and distance to move, the modal.
		const scaleX = width / this.modalRect.width;
		const scaleY = height / this.modalRect.height;
		const translateX = left - this.modalRect.left;
		const translateY = top - this.modalRect.top;

		
	}


	show() {
		this.modal.classList.remove("modal-hidden");
		this.backdrop.classList.remove("modal-hidden");
	}


	hide() {
		this.modal.classList.add("modal-hidden");
		this.backdrop.classList.add("modal-hidden");
	}


	// Resize/position the modal to take up most of the screen.
	zoom() {
		this.modal.classList.add("modal-transition");

		this.modal.style.transform = `
			translate(calc(50% - ${this.modalRect.width} / 2))
		`;

		this.modal.classList.remove("modal-transition");
	}


	// Resize/position the modal to sit on top of the clicked element.
	// This is also the place the modal should move back to while unzooming.
	unzoom() {
		
	}
}
