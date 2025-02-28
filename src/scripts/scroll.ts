// Scroll based animations

import Lenis from "lenis";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Code blocks //////////////////////////////////////////////////////////////

gsap.fromTo("#body .intro .upper", {
	y: 0,
}, {
	y: -200,

	scrollTrigger: {
		trigger: "#body .intro",
		start: "center center",
		scrub: true,
	},
});

gsap.fromTo("#body .intro .lower", {
	y: 0,
}, {
	y: -100,

	scrollTrigger: {
		trigger: "#body .intro",
		start: "center center",
		scrub: true,
	},
});

// Name text ////////////////////////////////////////////////////////////////

gsap.fromTo("#body .about-me .name-left", {
	y: 0,
}, {
	y: -400,

	scrollTrigger: {
		trigger: "#body .about-me",
		scrub: true,
	},
});

gsap.fromTo("#body .about-me .name-right", {
	y: -400,
}, {
	y: 0,

	scrollTrigger: {
		trigger: "#body .about-me",
		scrub: true,
	},
});

