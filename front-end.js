import ServiceInterface from '/js/elements.js';

window
.addEventListener("DOMContentLoaded", function (ev) {
	const { $tbody, $templateViewMessage, $templateViewElements, $loadElements, dispatchElements, Loading, context } = ServiceInterface.Main(ev);
	// the listener of enabled.
	$loadElements
	.addEventListener("enabled", function (enableEvent){
		const { target } = enableEvent;
		target.classList.add("load");
		target.disabled = false;
	});

	$loadElements
	.addEventListener("click", function (clickEvent){
		const { target } = clickEvent;
		target.disabled = true;
		target.textContent = Loading;
		dispatchElements.call(context, "cors");
	});
}, {once: true, capture: true});