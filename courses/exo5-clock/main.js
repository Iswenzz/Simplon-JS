const h = document.getElementById("hours");
const m = document.getElementById("minutes");
const s = document.getElementById("seconds");

const setDate = () =>
{
	const date = new Date();

	const hDeg = (date.getHours() / 12) * 360;
	h.style.transform = `rotate(${hDeg}deg)`;
	const mDeg = (date.getMinutes() / 60) * 360;
	m.style.transform = `rotate(${mDeg}deg)`;
	const sDeg = ((date.getSeconds() / 60) * 360) + 360;
	s.style.transform = `rotate(${sDeg}deg)`;
}

setInterval(setDate, 1000);
