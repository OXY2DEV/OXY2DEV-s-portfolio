import "../styles/main.css";

import gsap from "gsap";

import { createIcons, Mouse, SwatchBook } from "lucide";
//import eruda from "eruda";

createIcons({
	icons: { Mouse, SwatchBook }
});
//eruda.init();

import * as generics from "./generics";

import { init } from "./timelines";
import "./scroll";

let modeToggle = document.querySelector("#themer .mode .toggle input");
modeToggle?.addEventListener("click", () => {
	generics.changeMode();
});

let colorschemes: NodeListOf<HTMLDivElement> = document.querySelectorAll("#themer .colorscheme .scheme");

colorschemes.forEach(schemeElement => {
	schemeElement.addEventListener("click", () => {
		generics.setColorscheme(schemeElement.dataset.scheme);
	})
})

let themerBtn: HTMLDivElement | null = document.querySelector("#theme-changer");
let themerVisible = false;

if (themerBtn != null) {
	themerBtn.addEventListener("click", () => {
		if (themerVisible == false) {
			gsap.fromTo("#themer", {
				left: window.visualViewport?.width
			}, {
				left: 0,

				onStart: () => { themerBtn.classList.add("active"); },
				onComplete: () => { themerVisible = true }
			});
		} else {
			gsap.fromTo("#themer", {
				left: 0
			}, {
				left: window.visualViewport?.width,

				onStart: () => { themerBtn.classList.remove("active"); },
				onComplete: () => { themerVisible = false; }
			});
		}
	});
}

init.play();

