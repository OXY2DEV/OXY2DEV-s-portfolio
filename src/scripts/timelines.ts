// Holds normal animations.

import * as generics from "./generics";

import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

// Lucide icons used for animations.
import { createElement, IconNode, Activity, Sparkles, ScrollText, Spline, Mouse, Aperture, CircleCheckBig } from "lucide";

gsap.registerPlugin(TextPlugin);
generics.setTheme(null);
generics.setColorscheme(null);

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


// Prevent user from scrolling
init.set("#body", {
	height: "100dvh",
	overflow: "hidden"
});

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

init.set("#body", {
	height: "auto",
	overflow: "scroll"
});

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
			return "conic-gradient(from 270deg, var(--dark-s1) 0%, var(--dark-bg) 0%)";
		} else {
			return "conic-gradient(from 270deg, var(--light-s1) 0%, var(--light-bg) 0%)";
		};
	},
}, {
	backgroundImage: () => {
		if (generics.siteTheme == "dark") {
			return "conic-gradient(from 270deg, var(--dark-s1) 0%, var(--dark-bg) 50%)";
		} else {
			return "conic-gradient(from 270deg, var(--light-s1) 0%, var(--light-bg) 50%)";
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

reveal.fromTo("#body .intro .name p .two", {
	color: () => {
		if (generics.siteTheme == "dark") {
			return generics.colorScheme.darkFg;
		} else {
			return generics.colorScheme.lightFg;
		}
	},
}, {
	color: () => {
		if (generics.siteTheme == "dark") {
			return generics.colorScheme.darkC5;
		} else {
			return generics.colorScheme.lightC5;
		}
	},
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


gsap.fromTo("#page .intro .arrow", {
	backgroundImage: () => {
		if (generics.siteTheme == "dark") {
			return "-webkit-linear-gradient(var(--dark-bg) 0%, var(--dark-c5) 100%)"
		} else {
			return "-webkit-linear-gradient(var(--light-bg) 0%, var(--light-c5) 100%)"
		}
	},
}, {
	backgroundImage: () => {
		if (generics.siteTheme == "dark") {
			return "-webkit-linear-gradient(var(--dark-bg) 25%, var(--dark-c5) 100%)"
		} else {
			return "-webkit-linear-gradient(var(--light-bg) 25%, var(--light-c5) 100%)"
		}
	},
	duration: 0.5,
	repeatDelay: 0.25,

	repeat: -1,
	yoyo: true,
	repeatRefresh: true
});

// Project animations ////////////////////////////////////////////////

let projectAtomTL = gsap.timeline({
	paused: true,

	repeat: -1,
	repeatRefresh: true,
	repeatDelay: 1
});

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste .atom ", {
	opacity: 0,
	scale: 0.75
}, {
	opacity: 1,
	scale: 1
});

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste .atom .atom-container .orbit-1, #body .projects .ui#preview .display#ste .atom .atom-container .orbit-2", {
	rotate: 0
}, {
	rotate: 180,
	duration: 1,

	stagger: 0.125
});

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste .atom .atom-container .core, #body .projects .ui#preview .display#ste .atom .atom-container .orbit-1, #body .projects .ui#preview .display#ste .atom .atom-container .orbit-2", {
	opacity: 1,
	scale: 1
}, {
	opacity: 0,
	scale: 0.75
});

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste .atom .atom-container .background", {
	scale: 1.5,
	opacity: 0,
}, {
	scale: 1,
	opacity: 1,
});

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste .atom .atom-container .hider", {
	x: 200, y: -200
}, {
	x: 0, y: 0,
	ease: "power4.out"
});

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste .atom .background", {
	x: 0, y: 0,
}, {
	x: -5, y: 5,

	repeat: 1,
	yoyo: true,

	duration: 0.20,
	ease: "power4.out"
}, "-=0.25");

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste .atom .background .circle-right", {
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
	ease: "power4.out"
}, "-=0.25");

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste p", {
	width: 0
}, {
	width: "7ch",
	duration: 0.25,
});

projectAtomTL.fromTo("#body .projects .ui#preview .display#ste .atom, #body .projects .ui#preview .display#ste p", {
	opacity: 1,
}, {
	opacity: 0,
	duration: 0.25,
	delay: 2.5
});



let mkvTL = gsap.timeline({
	paused: true,

	onComplete: () => {
		document.querySelector("#body .projects .ui#desc .link")?.setAttribute("href", "https://github.com/OXY2DEV/markview.nvim");
	}
});


mkvTL.fromTo("#body .projects .ui#desc p", {
	text: ""
}, {
	text: "A fancy and hackable Markdown, Typst, LaTeX & YAML previewer for Neovim. Supports a wide variety of syntaxes along with the ability to customize everything."
});


let hpvTL = gsap.timeline({
	paused: true,

	onComplete: () => {
		document.querySelector("#body .projects .ui#desc .link")?.setAttribute("href", "https://github.com/OXY2DEV/helpview.nvim");
	}
});

hpvTL.fromTo("#body .projects .ui#desc p", {
	text: ""
}, {
	text: "A fancy Vimdoc/Help file previewer for Neovim that is designed to make help files more pleasing to look at."
});


let patTL = gsap.timeline({
	paused: true,

	onComplete: () => {
		document.querySelector("#body .projects .ui#desc .link")?.setAttribute("href", "https://github.com/OXY2DEV/patterns.nvim");
	}
});

patTL.fromTo("#body .projects .ui#desc p", {
	text: ""
}, {
	text: "Tree-sitter based Lua patterns & Regexp explainer and tester. Shows pattern explanation either through hovering or commands. Also comes with it's own patttern tester to test patterns."
});


let vhsTL = gsap.timeline({
	paused: true,

	onComplete: () => {
		document.querySelector("#body .projects .ui#desc .link")?.setAttribute("href", "https://github.com/OXY2DEV/tree-sitter-vhs");
	}
});

vhsTL.fromTo("#body .projects .ui#desc p", {
	text: ""
}, {
	text: "A more feature rich version of the VHS parser(created by charmbracelet) made with tree-sitter."
});


let steTL = gsap.timeline({
	paused: true,

	onComplete: () => {
		document.querySelector("#body .projects .ui#desc .link")?.setAttribute("href", "https://github.com/OXY2DEV/OXY2DEV-s-portfolio");
	}
});

steTL.fromTo("#body .projects .ui#desc p", {
	text: ""
}, {
	text: "A basic website built using Vite made entirely on a phone. The website is inspired by Neovim & Terminals and has a very simple structure."
});



let ghTL = gsap.timeline({
	paused: true,

	onComplete: () => {
		document.querySelector("#body .projects .ui#desc .link")?.setAttribute("href", "https://github.com/OXY2DEV");
	}
});

ghTL.fromTo("#body .projects .ui#desc p", {
	text: ""
}, {
	text: "Want to see more projects? Check out the github profile."
});


let entries = document.querySelectorAll("#body .projects .ui#list .item");
const descriptions: { [index: number]: GSAPTimeline | null } = {
	0: mkvTL,
	1: hpvTL,
	2: patTL,
	3: vhsTL,
	4: steTL,
	5: ghTL,
};
const affects: String[] = [
	"#body .projects .ui#preview .display#mkv",
	"#body .projects .ui#preview .display#hpv",
	"#body .projects .ui#preview .display#pat",
	"#body .projects .ui#preview .display#vhs",
	"#body .projects .ui#preview .display#ste",
];

entries.forEach((entry, index) => {
	entry.addEventListener("click", () => {
		gsap.to("#body .projects .ui#preview .display", {
			autoAlpha: 0
		});
		gsap.to(affects[index], { autoAlpha: 1 });

		if (descriptions[index]) {
			console.log(index)
			descriptions[index].restart();
		}

		if (index == 4) {
			projectAtomTL.restart();
		} else {
			projectAtomTL.pause();
		}
	});
});

projectAtomTL.play();
steTL.play();

