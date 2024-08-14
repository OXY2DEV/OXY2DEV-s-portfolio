import eruda from "eruda";
import Lenis from 'lenis'
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import "../sass/style.scss";
import { animations } from "./animations.js";

let lenis = new Lenis();
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

eruda.init();

let page_loaded = false;
window.onload = () => { page_loaded = true; };

let pre_comp = gsap.timeline({ paused: true });
let pre = gsap.timeline({ paused: true, delay: 0.2, onComplete: () => {
	if (page_loaded == true) {
		pre_comp.play();
		return;
	}

	window.onload = () => { pre_comp.play(); }
} });

document.querySelector("#preloader").onclick = () => {
	pre.pause();
	pre_comp.play();
}

// -+ Loader animations
pre.add(animations.add_terminal_lines("#preloader", {
	config: {
		onStart: function (ln) {
			ln.classList.add("line");
			animations.create_prompt(ln, { text: " " });
		},
	},
	animations: [
		{ text: "pkg ", duration: 0.2, onStart: (_, ele) => { ele.classList.add("hl-green") } },
		{ text: "install ", duration: 0.6, onStart: (_, ele) => { ele.classList.add("hl-yellow") } },
		{ text: "neovim", duration: 0.4 },
	]
}));
pre.add(animations.reveal("#preloader", [
	[
		{ text: "[ PKG ]", class: "source" },
		{ text: " : Testing available repos: " }
	],
	"╾━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╼",
], { ease: "power4.in", delay: 0.25, stagger: { each: 0.25 } }));
pre.add(animations.reveal("#preloader", [
	[
		{ text: " ", class: "hl-yellow" },
		{ text: "repo.source.default      " },
		{ text: "[ OK ]", class: "hl-green" },
	],
	[
		{ text: " ", class: "hl-yellow" },
		{ text: "repo.source.aux_1        " },
		{ text: "[ XX ]", class: "hl-red" },
	],
	[
		{ text: " ", class: "hl-yellow" },
		{ text: "repo.source.aux_2        " },
		{ text: "[ OK ]", class: "hl-green" },
	],
	[
		{ text: " ", class: "hl-yellow" },
		{ text: "repo.source.backup       " },
		{ text: "[ OK ]", class: "hl-yellow" },
	],
], { ease: "power4.in", delay: 0.25, stagger: { each: 0.25 } }));
pre.add(animations.reveal("#preloader", [
	"╾━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╼",
	[
		{ text: "[ PKG ]", class: "source" },
		{ text: " : Downloading package(s)" }
	],
	[
		{ text: "Hidden", class: "hidden" }
	],
], { ease: "power4.in", delay: 0.25, stagger: { each: 0.25 } }));


pre.add(animations.load({
	parent: document.querySelector("#preloader"),
	parts: [
		{
			text: [
				"━━──────────────",
				"━━━━━━──────────",
				"━━━━━━━━────────",
				"━━━━━━━━━━━━────",
				"━━━━━━━━━━━━━━──",
				"━━━━━━━━━━━━━━──",
				"━━━━━━━━━━━━━━━━",
			],
			class: [
				"loader",
				"loader",
				"loader",
				"loader",
				"loader-ready",
				"loader-ready"
			]
		},
		{
			text: [
				"   16% ",
				"   32% ",
				"   44% ",
				"   68% ",
				"   81% ",
				"   84% ",
				"  100% ",
			],
			class: [ "hl-grey" ]
		},
		{
			text: [
				"1.824MB",
				"3.684MB",
				"5.016MB",
				"7.752MB",
				"9.234MB",
				"9.576MB",
				"11.40MB",
			],
			class: [ "hl-grey" ]
		}
	],

	delay: 0.25,
	steps: 7
}))
pre.add(animations.load({
	parent: document.querySelector("#preloader"),
	parts: [
		{
			text: [ " " ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ "Preparing to unpack ../neovim-0.10.0-aarch_64.deb" ]
		},
		{
			text: [ ".", "..", "..." ]
		}
	],

	delay: 0.15,
	steps: 3
}))
pre.add(animations.load({
	parent: document.querySelector("#preloader"),
	parts: [
		{
			text: [ " " ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ "Unpacking neovim (0.10.0) over (0.9.5)" ]
		},
		{
			text: [ ".", "..", "...", ".", "..", "...", ". Done" ]
		}
	],

	delay: 0.15,
	steps: 7
}))

pre.add(animations.add_terminal_lines("#preloader", {
	config: {
		onStart: function (ln) {
			ln.classList.add("line");
			animations.create_prompt(ln, { text: " " });
		},
	},
	animations: [
		{ text: "cd ", duration: 0.2, onStart: (_, ele) => { ele.classList.add("hl-green") } },
		{ text: "~/.config/ ", duration: 0.6, onStart: (_, ele) => { ele.classList.add("hl-yellow") } },
	]
}));
pre.add(animations.add_terminal_lines("#preloader", {
	config: {
		onStart: function (ln) {
			ln.classList.add("line");
			animations.create_prompt(ln, { text: " " });
		},
	},
	animations: [
		{ text: "git ", duration: 0.2, onStart: (_, ele) => { ele.classList.add("hl-green") } },
		{ text: "clone ", duration: 0.6, onStart: (_, ele) => { ele.classList.add("hl-yellow") } },
		{ text: "https://www.github.com/OXY2DEV/nvim/ ", duration: 0.4 },
	]
}));

pre.add(animations.reveal("#preloader", [
	[
		{ text: "󰊢 ", class: "hl-red" },
		{ text: " Cloning into 'nvim'" }
	]
], { ease: "power4.in", delay: 0.25, stagger: { each: 0.25 } }));
pre.add(animations.load({
	parent: document.querySelector("#preloader"),
	parts: [
		{
			text: [ "󰊢 " ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ " Enumarating objects: " ]
		},
		{
			text: [ "1", "22", "74", "125", "176", "290", "343", ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ "", "", "", "", "", "", ", done." ]
		}
	],

	delay: 0.15,
	steps: 7
}));
pre.add(animations.load({
	parent: document.querySelector("#preloader"),
	parts: [
		{
			text: [ "󰊢 " ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ " Counting objects: " ]
		},
		{
			text: [ "1/343", "22/343", "74/343", "125/343", "176/343", "290/343", "343/343", ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ "", "", "", "", "", "", ", done." ]
		}
	],

	delay: 0.15,
	steps: 7
}));
pre.add(animations.load({
	parent: document.querySelector("#preloader"),
	parts: [
		{
			text: [ "󰊢 " ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ " Compressing objects: " ]
		},
		{
			text: [ "1/127", "40/127", "74/127", "115/127", "127/127" ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ "", "", "", "", ", done." ]
		}
	],

	delay: 0.05,
	steps: 5
}));
pre.add(animations.reveal("#preloader", [
	[
		{ text: "󰊢 ", class: "hl-red" },
		{ text: " Total 343 (delta 0), reused 0 (delta 0)", whitespace: "" }
	]
], { ease: "power4.in", delay: 0.25, stagger: { each: 0.25 } }));


pre_comp.add(animations.load({
	parent: document.querySelector("#preloader"),
	parts: [
		{
			text: [ "󰊢 " ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ " Unpacking objects: " ]
		},
		{
			text: [ "1/343", "105/343", "230/343", "343/343" ],
			class: [ "hl-yellow" ]
		},
		{
			text: [ "", "", "", ", done." ]
		}
	],

	delay: 0.15,
	steps: 4
}));
pre_comp.add(animations.add_terminal_lines("#preloader", {
	config: {
		onStart: function (ln) {
			ln.classList.add("line");
			animations.create_prompt(ln, { text: " " });
		},
	},
	animations: [
		{ text: "nvim", duration: 0.2, onStart: (_, ele) => { ele.classList.add("hl-green") } },
	]
}));
pre_comp.to("#preloader", { autoAlpha: 0, delay: 0.5 });

pre_comp.add(animations.reveal("#main .intro .bg .statuscol .lnum", animations.num_array(30), { duration: 0.15, stagger: 0 }));
pre_comp.add(animations.add_terminal_lines("#main .intro .bg .buffer", {
	animations: [
		{ text: "󰀲 Dev env.", duration: 0.5, onStart: (_, ele) => { ele.classList.add("h1") } },
	]
}));
pre_comp.add(animations.reveal("#main .intro .bg .buffer", [
	[ { text: " " } ],
	[
		{ text: " 󰟀 " },
		{ text: "OS: Android 14" }
	],
	[
		{ text: "  " },
		{ text: "Terminal: Termux" }
	],
	[
		{ text: "  " },
		{ text: "Editor: Neovim" }
	],
	[ { text: " " } ]
]));
pre_comp.add(animations.add_terminal_lines("#main .intro .bg .buffer", {
	animations: [
		{ text: " Used languages", duration: 0.5, onStart: (_, ele) => { ele.classList.add("h1") } },
	]
}));
pre_comp.add(animations.reveal("#main .intro .bg .buffer", [
	[ { text: " " } ],
	[
		{ text: "   ", class: "list-marker" },
		{ text: "  " },
		{ text: "Lua" }
	],
	[
		{ text: "   ", class: "list-marker" },
		{ text: " 󰌞 " },
		{ text: "Javascript" }
	],
	[
		{ text: "   ", class: "list-marker" },
		{ text: "  " },
		{ text: "Sass" }
	],
	[
		{ text: "   ", class: "list-marker" },
		{ text: "  " },
		{ text: "C" }
	],
	[
		{ text: "   ", class: "list-marker" },
		{ text: " 󰌠 " },
		{ text: "Python" }
	],
	[
		{ text: "   ", class: "list-marker" },
		{ text: "  " },
		{ text: "Bash" }
	],
	[ { text: " " } ],
	{ text: "󰋽 Note", class: "callout-note marker" },
	{ text: "And I am always open to learning new things! 🙂", class: "callout-note" },
	[ { text: " " } ]
], { stagger: 0 }));
pre_comp.add(animations.add_terminal_lines("#main .intro .bg .buffer", {
	animations: [
		{ text: " Stats", duration: 0.5, onStart: (_, ele) => { ele.classList.add("h1") } },
	]
}));
pre_comp.add(animations.reveal("#main .intro .bg .buffer", [
	[ { text: " " } ],
	[
		{ text: "   ", class: "list-marker" },
		{ text: "  " },
		{ text: "Projects: 4+" }
	],
	[
		{ text: "   ", class: "list-marker" },
		{ text: "  " },
		{ text: "Lines of code written: 237K+" }
	],
	[ { text: " " } ],
], { stagger: 0 }));

pre.play()
// -_


function align_gradient (mouseEvent) {
	let Y = mouseEvent.pageY;
	let border = document.querySelector("#main .intro .statuscol .border");

	gsap.to(border, { backgroundPositionY: "calc(" + Y.toString() + "px - 5rem)" });
}

let intro = document.querySelector("#main");

ScrollTrigger.create({
	trigger: "#main .intro .bg",
	target: "#main .intro .bg",
	pin: true,
	//scrub: true
})

intro.addEventListener("mousemove", align_gradient)

