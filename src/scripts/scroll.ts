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

// Interests section ////////////////////////////////////////////////////////

let interestsTL = gsap.timeline({
	scrollTrigger: {
		trigger: "#body .interests",
		//snap: {
		//	snapTo: 0.5,
		//},
	}
});

interestsTL.fromTo("#body .interests .doc > p", {
	opacity: 0
}, {
	opacity: 1,
	stagger: 0.1,
	duration: 0.25
}, "<");

interestsTL.fromTo("#body .interests .script .line", {
	opacity: 0
}, {
	opacity: 1,
	stagger: {
		each: 0.05,
		from: "end"
	},
	duration: 0.25
}, "<");

interestsTL.fromTo("#body .interests .winbar span", {
	opacity: 0
}, {
	opacity: 1,
	stagger: 0.05
});


