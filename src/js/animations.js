import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin)

export let animations = {};

/*** @description Creates a prompt for the item
	 @param {string} parent - Parent element
	*/
animations.create_prompt = function (parent, config) {
	if (!config) { config = {} };

	let prompt = document.createElement("div");

	prompt.classList.add(config.class || "prompt");
	prompt.innerText = config.text || "󰘧";

	parent.prepend(prompt);
}

animations.add_terminal_lines = function (container, line) {
	if (Array.isArray(line) == true) {
		line = {
			config: {},
			animations: line
		}
	}

	let ln = document.createElement("p");
	document.querySelector(container).appendChild(ln);

	let l_tl = gsap.timeline({ ...line.config, ...{
		onStartParams: [ ln ]
	} });

	line.animations.forEach(part => {
		let elem = document.createElement("span");
		ln.appendChild(elem);

		let def = {
			onStartParams: [ ln, elem ]
		}

		l_tl.to(elem, { ...part, ...def })
	})

	return l_tl;
};

animations.reveal = function (container, lines, config) {
	let lns = [];

	for (let line of lines) {
		let elem = document.createElement("p");

		if (typeof(line) == "string") {
			elem.style.whiteSpace = config ? config.whitespace : "pre";
			elem.innerText = line;
		} else if (!Array.isArray(line)) {
			elem.style.whiteSpace = line.config ? line.config.whitespace : "pre";
			elem.innerText = line.text;

			if (line.class) {
				elem.className = line.class;
			}
		} else {
			for (let part of line) {
				let sp = document.createElement("span");

				sp.innerText = part.text || "";
				sp.style.whiteSpace = part.whitespace || "pre";

				if (part.class != null) {
					sp.classList.add(part.class);
				}

				elem.appendChild(sp)
			}
		}

		document.querySelector(container).appendChild(elem);
		lns.push(elem)
	}

	return gsap.fromTo(lns, { opacity: 0 }, { ...{ opacity: 1, stagger: { each: 0.2, ease: "power2.in" }, ...config } })
}

animations.load = function (config) {
	let line = document.createElement("p");
	let parts = [];

	for (let i = 0; i < config.parts.length; i++) {
		let loader = document.createElement("span");
		loader.style.whiteSpace = "pre";

		parts.push(loader);
		line.appendChild(loader);
	}
	config.parent.appendChild(line);

	return gsap.fromTo(line, {}, {
		duration: config.delay,
		repeat: config.steps - 1,
		onStart: () => {
			parts.forEach((part, index) => {
				let conf = config.parts[index];
				
				if (conf.text && conf.text.length > 0) {
					part.innerText = conf.text.shift();
				}
				
				if (conf.class && conf.class.length > 0) {
					part.className = conf.class.shift();
				}
			})
		},
		onRepeat: () => {
			parts.forEach((part, index) => {
				let conf = config.parts[index];
				
				if (conf.text && conf.text.length > 0) {
					part.innerText = conf.text.shift();
				}
				
				if (conf.class && conf.class.length > 0) {
					part.className = conf.class.shift();
				}
			})
		}
	})
}

animations.num_array = function (max) {
	let _o = [];

	for (let n = 1; n <= max; n++) {
		_o.push(n.toString())
	}

	return _o;
}

