import "../styles/main.css";

import gsap from "gsap";
import eruda from "eruda";

eruda.init();

let loaderInit = gsap.timeline({ delay: 0.5 });

loaderInit.fromTo("#loader .atom .atom-container .core", {
	backgroundImage: "radial-gradient(at 25% 25%, #89B4FA 5%, transparent 90%)"
}, {
	backgroundImage: "radial-gradient(at 25% 25%, #89B4FA 0%, transparent 90%)",
	duration: .75
}, "<");

loaderInit.fromTo("#loader .atom .atom-container .orbit", {
	scale: 0.75,
	opacity: 0,
}, {
	scale: 1,
	opacity: 0.4,

	ease: "bounce.out",
	duration: .75,
	stagger: 0.25
}, "<");


