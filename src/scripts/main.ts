import "../styles/main.css";

import { createIcons, Mouse } from "lucide";
import eruda from "eruda";

createIcons({
	icons: { Mouse }
});

eruda.init();

import { init } from "./timelines";
import "./scroll";

//document.querySelector("body")?.addEventListener("click", () => {
//	if (siteTheme == "light") {
//		setTheme("dark");
//	} else {
//		setTheme("light");
//	}
//})

init.play();

