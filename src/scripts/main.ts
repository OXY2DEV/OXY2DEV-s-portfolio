import "../styles/main.css";

import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

import { createIcons, icons } from "lucide";
import eruda from "eruda";

/**
	*
	* Has the page loaded?
*/
let loadedPage: boolean = false;

document.onload = () => { loadedPage = true; };

eruda.init();

gsap.registerPlugin(TextPlugin)
createIcons({ icons });

/**
	*
	* Messages to load!
*/
let loaderMsg: Array<Array<string>> = [
	[ "activity", "Fetching site data" ],

	[ "sparkles", "Applying styles" ],
	[ "scroll-text", "Loading scripts" ],
	[ "spline", "Importing GSAP" ],
	[ "mouse", "Importing Lenis" ],
	[ "aperture", "Getting icons" ],
	[ "circle-check-big", "Ready!" ],
];

/* |fS "Loader functions"
*/

let intervalID: number;

function createLoaderMsg() {
	if (loadedPage == true || loaderMsg.length < 1) {
		clearInterval(intervalID);
		return;
	}

	let msgIndex: number = 0; // Math.floor(Math.random() * loaderMsg.length);
	let msg: Array<string> = loaderMsg[msgIndex];

	loaderMsg.splice(msgIndex, 1);

	const newHolder: HTMLDivElement = document.createElement("div");

	const newIcon: HTMLDivElement = document.createElement("div");
	const newText: HTMLDivElement = document.createElement("div");

	if (msg[0] != null) {
		newIcon.setAttribute("data-lucide", msg[0]);
	}

	newHolder.classList.add("entry");

	newIcon.classList.add("icon");
	newText.classList.add("text");

	newHolder.appendChild(newIcon);
	newHolder.appendChild(newText);

	let msgHolder = document.querySelector("#loader .loader-text");

	msgHolder?.prepend(newHolder);
	createIcons({ icons });

	let revealTL = gsap.timeline();

	revealTL.fromTo(newHolder, {
		height: 0,
		x: 25, opacity: 0
	}, {
		height: "auto",
		x: 0, opacity: 1,

		duration: 0.25,
	})

	revealTL.to(newText, {
		text: msg[1],
		delay: 0.1,
		duration: 0.5,
	});

	revealTL.to(newHolder, {
		opacity: 0,

		delay: 3,
		duration: 0.25,

		onComplete: () => {
			newHolder.style.display = "none";
		}
	});
}

/* |fE */

/**
	*
	* Page initiated!
*/
let init = gsap.timeline({
	delay: 0.5, paused: true,

	onStart: () => {
		intervalID = setInterval(createLoaderMsg, 1250);
	}
})

init.fromTo("#loader .atom .core", {
	scale: 0.5,
	opacity: 0
}, {
	scale: 1,
	opacity: 1
}, "<");
init.fromTo("#loader .atom .orbit-1", {
	rotate: -30,
	opacity: 0
}, {
	rotate: 0,
	opacity: 1
}, "<");
init.fromTo("#loader .atom .orbit-2", {
	rotate: 30,
	opacity: 0
}, {
	rotate: 0,
	opacity: 1,
}, "<");

init.addLabel("Hide", "+=0.5");

init.to("#loader .atom .core", {
	scale: 0.5,
	opacity: 0
}, "Hide");
init.to("#loader .atom .orbit-1", {
	rotate: -30,
	opacity: 0
}, "Hide");
init.to("#loader .atom .orbit-2", {
	rotate: 30,
	opacity: 0,
}, "Hide");

init.addLabel("Logo", "+=0.25");

init.fromTo("#loader .atom .background", {
	opacity: 0,
	scale: 1.5
}, {
	opacity: 1,
	scale: 1,
}, "Logo");

init.fromTo("#loader .atom .hider", {
	x: 200, y: -200,
}, {
	x: 0, y: 0,
	ease: "power4.out"
});

init.fromTo("#loader .atom .background", {
	x: 0, y: 0,
}, {
	x: -5, y: 5,

	repeat: 1,
	yoyo: true,

	duration: 0.25,
	ease: "power4.out"
}, "-=0.25");

const computedStyle = getComputedStyle(document.documentElement);

init.fromTo("#loader .atom .background .circle-right", {
	stroke: computedStyle.getPropertyValue("--fg") || "#CDD6F4"
}, {
	stroke: "#89B4FA",
	ease: "power4.out"
}, "-=0.25");

init.play();

