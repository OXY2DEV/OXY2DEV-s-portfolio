// Holds generic functions & utilities

import gsap from "gsap";

/**
	*
	* Has the page loaded?
*/
export let loadedPage: boolean = false;
window.onload = () => { loadedPage = true; };

export let colorScheme: { [key: string]: string } = {};
export let siteTheme: "dark" | "light" = "dark";

export const HI = 1;

function updateCheckbox (check: boolean) {
	let modeInput: HTMLInputElement | null = document.querySelector("#themer .mode .toggle input");

	if (modeInput == null) {
		return;
	} else if (modeInput.checked != check) {
		modeInput.checked = check;
	}
}

/**
	*
	* Sets the site theme(dark/light)
*/
export function setTheme (theme?: "dark" | "light") {
	const media = window.matchMedia("(prefers-color-scheme: dark)");
	let body = document.querySelector("body");

	if (body == null) {
		return;
	} else if (theme != null) {
		siteTheme = theme;
		body.setAttribute("data-theme", theme);

		updateCheckbox(theme == "dark");
	} else if (media.matches) {
		siteTheme = "dark";
		body.setAttribute("data-theme", "dark");

		updateCheckbox(true);
	} else {
		siteTheme = "light";
		body.setAttribute("data-theme", "light");

		updateCheckbox(false);
	}

	updateColorscheme();
}

/*
	*
	* Toggles dark mode.
*/
export function changeMode () {
	if (siteTheme == "dark") {
		setTheme("light");
	} else {
		setTheme("dark");
	}
}

/**
	*
	* Sets the site color-scheme.
*/
export function updateColorscheme () {
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

export function updateScheme () {
	let schemeName = localStorage.getItem("__colorscheme") || "catppuccin";
	let schemes: NodeListOf<HTMLDivElement> = document.querySelectorAll("#themer .colorscheme .scheme");

	schemes.forEach(scheme => {
		let name = scheme.dataset || "";

		if (name == schemeName) {
			scheme.classList.add("current");
		} else {
			scheme.classList.remove("current");
		}
	})
}

const schemeValue: { [name: string]: { [property: string]: string } } = {
	catppuccin: {
		lightBg: "#EFF1F5",
		lightFg: "#4C4F69",

		lightC1: "#D20F39",
		lightC2: "#FE640B",
		lightC3: "#DF8E1D",
		lightC4: "#40A02B",
		lightC5: "#1E66F5",

		lightS1: "#BCC0CC",
		lightS2: "#8C8FA1",
		lightS3: "#6C6F85",


		darkBg: "#1E1E2E",
		darkFg: "#CDD6F4",

		darkC1: "#F38BA8",
		darkC2: "#FAB387",
		darkC3: "#F9E2AF",
		darkC4: "#A6E3A1",
		darkC5: "#89B4FA",

		darkS1: "#45475A",
		darkS2: "#7F849C",
		darkS3: "#A6ADC8",
	},
	tokyonight: {
		lightBg: "#E1E2E7",
		lightFg: "#3760BF",

		lightC1: "#F52A65",
		lightC2: "#B15C00",
		lightC3: "#8C6C3E",
		lightC4: "#587539",
		lightC5: "#2E7DE9",

		lightS1: "#B9BFDD",
		lightS2: "#919ED3",
		lightS3: "#687EC9",


		darkBg: "#1A1B26",
		darkFg: "#C0CAF5",

		darkC1: "#F7768E",
		darkC2: "#FF9E64",
		darkC3: "#E0AF68",
		darkC4: "#9ECE6A",
		darkC5: "#7AA2F7",

		darkS1: "#41405A",
		darkS2: "#6C688A",
		darkS3: "#9B94BE",
	},

	onedark: {
		lightBg: "#282C34",
		lightFg: "#ABB2BF",

		lightC1: "#E06C75",
		lightC2: "#d19A66",
		lightC3: "#E5C07B",
		lightC4: "#98C379",
		lightC5: "#61AFEF",

		lightS1: "#464A54",
		lightS2: "#666B76",
		lightS3: "#888E9A",


		darkBg: "#282C34",
		darkFg: "#ABB2BF",

		darkC1: "#E06C75",
		darkC2: "#d19A66",
		darkC3: "#E5C07B",
		darkC4: "#98C379",
		darkC5: "#61AFEF",

		darkS1: "#464A54",
		darkS2: "#666B76",
		darkS3: "#888E9A",
	},

	evergreen: {
		lightBg: "#FFFBEF",
		lightFg: "#5C6A72",

		lightC1: "#F85552",
		lightC2: "#F57D26",
		lightC3: "#DFA000",
		lightC4: "#8DA101",
		lightC5: "#3A94C5",

		lightS1: "#D0D6CA",
		lightS2: "#A3B2AA",
		lightS3: "#7B8D8E",


		darkBg: "#272E33",
		darkFg: "#5C6A72",

		darkC1: "#E67E80",
		darkC2: "#E69875",
		darkC3: "#DBBC7F",
		darkC4: "#A7C080",
		darkC5: "#7FBBB3",

		darkS1: "#33525D",
		darkS2: "#367A81",
		darkS3: "#3CA39B",
	}
};

export function setColorscheme (scheme: string | undefined) {
	scheme = scheme || localStorage.getItem("__colorscheme") || "catppuccin";

	if (schemeValue[scheme] == null) {
		return;
	}

	const value = schemeValue[scheme];

	gsap.to(":root", {
		"--light-bg": value.lightBg,
		"--light-fg": value.lightFg,

		"--light-c1": value.lightC1,
		"--light-c2": value.lightC2,
		"--light-c3": value.lightC3,
		"--light-c4": value.lightC4,
		"--light-c5": value.lightC5,

		"--light-s1": value.lightS1,
		"--light-s2": value.lightS2,
		"--light-s3": value.lightS3,


		"--dark-bg": value.darkBg,
		"--dark-fg": value.darkFg,

		"--dark-c1": value.darkC1,
		"--dark-c2": value.darkC2,
		"--dark-c3": value.darkC3,
		"--dark-c4": value.darkC4,
		"--dark-c5": value.darkC5,

		"--dark-s1": value.darkS1,
		"--dark-s2": value.darkS2,
		"--dark-s3": value.darkS3,

		onComplete: () => {
		}
	});

	colorScheme = value;

	let colorschemes: NodeListOf<HTMLDivElement> = document.querySelectorAll("#themer .colorscheme .scheme");
	colorschemes.forEach(sc => {
		if (sc.dataset.scheme == scheme) {
			sc.classList.add("current");
		} else {
			sc.classList.remove("current");
		}
	});
}

