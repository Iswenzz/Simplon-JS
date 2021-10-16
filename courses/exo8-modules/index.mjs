import { incCounter } from "./count.mjs";

document.getElementById("counter-btn").addEventListener("click", () =>
    document.getElementById("counter").innerText = incCounter());
