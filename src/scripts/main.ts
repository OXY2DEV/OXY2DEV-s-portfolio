import "../styles/main.css";

import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

import { createIcons, createElement, IconNode, ScrollText, Spline, Mouse, Aperture, CircleCheckBig } from "lucide";
import { Activity, Sparkles } from "lucide";
import eruda from "eruda";

let colorScheme: { [key: string]: string } = {};
let siteTheme: "dark" | "light" = "dark";

/**
	*
	* Sets the site theme(dark/light)
*/
function setTheme (theme?: "dark" | "light") {
	const media = window.matchMedia("(prefers-color-scheme: dark)");
	let body = document.querySelector("body");

	if (body == null) {
		return;
	} else if (theme != null) {
		siteTheme = theme;
		body.setAttribute("data-theme", theme);
	} else if (media.matches) {
		siteTheme = "dark";
		body.setAttribute("data-theme", "dark");
	} else {
		siteTheme = "light";
		body.setAttribute("data-theme", "light");
	}

	updateColorscheme();
}

/**
	*
	* Sets the site color-scheme.
*/
function updateColorscheme () {
	const computedStyle = getComputedStyle(document.documentElement);

	colorScheme = {
		lightBg: computedStyle.getPropertyValue("--light-bg"),
		lightFg: computedStyle.getPropertyValue("--light-fg"),

		lightC1: computedStyle.getPropertyValue("--light-c1"),
		lightC2: computedStyle.getPropertyValue("--light-c2"),
		lightC3: computedStyle.getPropertyValue("--light-c3"),
		lightC4: computedStyle.getPropertyValue("--light-c4"),
		lightC5: computedStyle.getPropertyValue("--light-c5"),

		lightS1: computedStyle.getPropertyValue("--light-s1"),
		lightS2: computedStyle.getPropertyValue("--light-s2"),
		lightS3: computedStyle.getPropertyValue("--light-s3"),


		darkBg: computedStyle.getPropertyValue("--dark-bg"),
		darkFg: computedStyle.getPropertyValue("--dark-fg"),

		darkC1: computedStyle.getPropertyValue("--dark-c1"),
		darkC2: computedStyle.getPropertyValue("--dark-c2"),
		darkC3: computedStyle.getPropertyValue("--dark-c3"),
		darkC4: computedStyle.getPropertyValue("--dark-c4"),
		darkC5: computedStyle.getPropertyValue("--dark-c5"),

		darkS1: computedStyle.getPropertyValue("--dark-s1"),
		darkS2: computedStyle.getPropertyValue("--dark-s2"),
		darkS3: computedStyle.getPropertyValue("--dark-s3"),
	};
};

setTheme();

document.querySelector("body")?.addEventListener("click", () => {
	if (siteTheme == "light") {
		setTheme("dark");
	} else {
		setTheme("light");
	}
})

/**
	*
	* Has the page loaded?
*/
let loadedPage: boolean = false;
window.onload = () => { loadedPage = true; };

eruda.init();

gsap.registerPlugin(TextPlugin)
createIcons({
	icons: { Mouse }
});

/**
	*
	* Page initiated!
*/
let init = gsap.timeline({
	delay: 0.5, paused: true,

	onStart: () => {
		intervalID = setInterval(createLoaderMsg, 1250);
	}
});

/**
	*
	* Page reveal!
*/
let reveal = gsap.timeline({ delay: 0.25, paused: true });

/**
	*
	* Scroll icon animator
*/
let scrollIconTL = gsap.timeline({
	repeat: -1, repeatDelay: 2.5,
	yoyo: true,
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
		reveal.play();
		return;
	} else if (loadedPage == true) {
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

const computedStyle = getComputedStyle(document.documentElement);

init.fromTo("#loader .atom .background .circle-right", {
	stroke: computedStyle.getPropertyValue("--fg") || "#CDD6F4"
}, {
	stroke: computedStyle.getPropertyValue("--color-4") || "#89B4FA",
	ease: "power4.out"
}, "-=0.25");

init.play();

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

if (siteTheme == "dark") {
	reveal.fromTo("#body .intro", {
		backgroundImage: "conic-gradient(from -90deg, var(--dark-bg) 100%, var(--dark-fg)) 100%"
	}, {
		backgroundImage: "conic-gradient(from -90deg, var(--dark-bg)   0%, var(--dark-fg)) 100%",
		delay: 1,

		ease: "sine.in"
	});
} else {
	reveal.fromTo("#body .intro", {
		backgroundImage: "conic-gradient(from -90deg, var(--light-bg) 100%, var(--light-fg)) 100%"
	}, {
		backgroundImage: "conic-gradient(from -90deg, var(--light-bg)   0%, var(--light-fg)) 100%",
		delay: 1,

		ease: "sine.in"
	});
}

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

reveal.to("#body .intro .name p .two", {
	color: computedStyle.getPropertyValue("--color-4") || "#89B4FA",
	duration: 0.5
});

reveal.fromTo("#body .intro .upper, #body .intro .lower", {
	y: 16,
	opacity: 0
}, {
	y: 0,
	opacity: 1,

	duration: 0.5,
	stagger: 0.25
}, "-=0.25");

reveal.fromTo("#body .intro .scroll", {
	opacity: 0
}, {
	opacity: 1,
	duration: 0.25,
}, "-=0.25");



scrollIconTL.fromTo("#body .intro .scroll path", {
	y: -1
}, {
	y: 0,

	duration: 0.25,
	repeat: 1, yoyo: true
});

