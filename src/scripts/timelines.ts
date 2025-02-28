// Holds normal animations.

import * as generics from "./generics";

import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

// Lucide icons used for animations.
import { createElement, IconNode, Activity, Sparkles, ScrollText, Spline, Mouse, Aperture, CircleCheckBig } from "lucide";

gsap.registerPlugin(TextPlugin);
generics.setTheme();

/**
	*
	* Page initiated!
*/
export let init = gsap.timeline({
	delay: 0.5, paused: true,

	onStart: () => {
		intervalID = setInterval(createLoaderMsg, 1250);
	}
});

/**
	*
	* Messages to load!
*/
let loaderMsg: Array<[ IconNode, string ]> = [
	[ Activity, "Fetching site data" ],

	[ Sparkles, "Applying styles" ],
	[ ScrollText, "Loading scripts" ],
	[ Spline, "Importing GSAP" ],
	[ Mouse, "Importing Lenis" ],
	[ Aperture, "Getting icons" ],
	[ CircleCheckBig, "Ready!" ],
];

/* |fS "Loader functions"
*/

let intervalID: number;

function createLoaderMsg() {
	if (loaderMsg.length < 1) {
		clearInterval(intervalID);
		setTimeout(() => { reveal.play(); }, 500);
		return;
	} else if (generics.loadedPage == true) {
		loaderMsg = loaderMsg.splice(-1);
	}

	let msgIndex: number = 0; // Math.floor(Math.random() * loaderMsg.length);
	let msg: [ IconNode, string ] = loaderMsg[msgIndex];

	loaderMsg.splice(msgIndex, 1);

	const newHolder: HTMLDivElement = document.createElement("div");

	const newIcon: SVGElement = createElement(msg[0], {});
	const newText: HTMLDivElement = document.createElement("div");

	newHolder.classList.add("entry");

	newIcon.classList.add("icon");
	newText.classList.add("text");

	newHolder.appendChild(newIcon);
	newHolder.appendChild(newText);

	let msgHolder = document.querySelector("#loader .loader-text");

	msgHolder?.prepend(newHolder);

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
}

/* |fE */

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

	duration: 0.20,
	ease: "power4.out"
}, "-=0.25");

init.fromTo("#loader .atom .background .circle-right", {
	stroke: () => {
		if (generics.siteTheme == "dark") {
			return generics.colorScheme.darkFg;
		} else {
			return generics.colorScheme.lightFg;
		}
	}
}, {
	stroke: () => {
		if (generics.siteTheme == "dark") {
			return generics.colorScheme.darkC5;
		} else {
			return generics.colorScheme.lightC5;
		}
	},
	ease: "power4.out",

	onComplete: () => {
		let intro: SVGPathElement | null = document.querySelector("#loader .atom .background .circle-right");

		if (intro) {
			intro.classList.add("changed");
		}
	}
}, "-=0.25");

/**
	*
	* Page reveal!
*/
export let reveal = gsap.timeline({ delay: 0.25, paused: true });

reveal.to("#loader .atom", {
	scale: 0.75,

	duration: 0.5,
	ease: "power4.in"
}, "<");

reveal.to("#loader", {
	autoAlpha: 0,

	duration: 0.5,
	ease: "power4.in"
}, "<");

reveal.fromTo("#body .intro", {
	backgroundImage: () => {
		if (generics.siteTheme == "dark") {
			return "conic-gradient(from -90deg, var(--dark-bg) 100%, var(--dark-fg) 100%)";
		} else {
			return "conic-gradient(from -90deg, var(--light-bg) 100%, var(--light-fg) 100%)";
		};
	},
}, {
	backgroundImage: () => {
		if (generics.siteTheme == "dark") {
			return "conic-gradient(from -90deg, var(--dark-bg) 0%, var(--dark-fg) 100%)";
		} else {
			return "conic-gradient(from -90deg, var(--light-bg) 0%, var(--light-fg) 100%)";
		};
	},
	delay: 0.5,

	ease: "sine.in",
	onComplete: () => {
		let intro: HTMLDivElement | null = document.querySelector("#body .intro");

		if (intro) {
			intro.style.backgroundImage = "";
		}
	}
});

reveal.addLabel("Info");

reveal.fromTo("#body .intro .name p span", {
	y: 48,
}, {
	y: 0,
	stagger: 0.1,
	duration: 0.25
}, "Info");

reveal.fromTo("#body .intro .desc p", {
	x: 16,
	opacity: 0,
}, {
	x: 0,
	opacity: 1,

	duration: 0.5
}, "Info");

if (generics.siteTheme == "dark") {
	reveal.to("#body .intro .name p .two", {
		color: "var(--dark-c5)",
		duration: 0.5
	});
} else {
	reveal.to("#body .intro .name p .two", {
		color: "var(--light-c5)",
		duration: 0.5
	});
}

reveal.fromTo("#body .intro .upper, #body .intro .lower", {
	y: 16,
	opacity: 0
}, {
	y: 0,
	opacity: 1,

	duration: 0.5,
	stagger: 0.25
}, "-=0.25");

