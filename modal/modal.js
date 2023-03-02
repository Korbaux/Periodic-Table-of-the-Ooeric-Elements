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

		// Everything hidden by default
		this.hide();

		// CSS generated in JS goes in this style tag.
		this.progCSS = document.createElement("style");
		this.progCSS.id = "modal-programmatic-css";

		this.modalRect = this.modal.getBoundingClientRect();
		window.addEventListener("resize", () => {
			this.modalRect = this.modal.getBoundingClientRect();
		});


		this.modal.appendChild(this.iframe);
		this.modal.appendChild(this.closeButton);

		document.head.appendChild(this.progCSS);
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
		const { width, height, left, top } = el.getBoundingClientRect();

		// Calculate factors by which to resize, and distance to move, the modal.
		const scaleX = width / this.modalRect.width;
		const scaleY = height / this.modalRect.height;
		const translateX = left - this.modalRect.left;
		const translateY = top - this.modalRect.top;

		// Applying programmatically-generated CSS this way lets you continue
		//   to just use element.classList methods instead of refactoring the
		//   script to use element.style.attribute.
		this.progCSS.textContent = `
			.modal-main:not(.modal-centered) {
				transform: scale3d(${scaleX}, ${scaleY}, 1)
				           translate3d(${translateX}px, ${translateY}px, 0);
			}
		`;
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
	zoom(instantly) {
		if (instantly) {
			// Temporarily remove the transition effect to let
			//   the modal move to the new element instantly.
			this.modal.classList.remove("modal-transition");
		}
		this.modal.classList.add("modal-centered");
		if (instantly) {
			this.modal.classList.add("modal-transition");
		}
	}


	// Resize/position the modal to sit on top of the clicked element.
	// This is also the place the modal should move back to while unzooming.
	unzoom(instantly) {
		if (instantly) {
			this.modal.classList.remove("modal-transition");
		}
			this.modal.classList.remove("modal-centered");
		if (instantly) {
			this.modal.classList.add("modal-transition");
		}
	}
}
