export let count = 0;

export const incCounter = () => 
	document.getElementById("counter").innerText = ++count;
