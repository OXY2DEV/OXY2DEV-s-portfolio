// Holds generic functions & utilities

/**
	*
	* Has the page loaded?
*/
export let loadedPage: boolean = false;
window.onload = () => { loadedPage = true; };

export let colorScheme: { [key: string]: string } = {};
export let siteTheme: "dark" | "light" = "dark";

export const HI = 1;

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

