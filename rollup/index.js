import EventListener from "../dist/min/es/EventListener";
let OS = {};
if (!('OS' in window)){
	window['OS'] = OS;
}
OS.EventListener = EventListener