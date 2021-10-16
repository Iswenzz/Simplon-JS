const showFancyBox = (box, src) =>
{
	const image = document.getElementById(box.getAttribute("data-image"));
	box.classList.add("active");
	image.src = src;
};

const hideFancyBox = (sender, e) =>
{
	sender.classList.remove("active");
};

const onFancyBoxItemClick = (e) =>
{
	showFancyBox(document.getElementById(e.target.parentElement.getAttribute("data-target")), e.target.src);
};

const initFancyBoxs = () =>
{
	for (const elem of document.querySelectorAll(".fancybox-container"))
		for (const item of elem.children)
			item.addEventListener("click", onFancyBoxItemClick);

	for (const elem of document.querySelectorAll(".fancybox"))
		document.getElementById(elem.getAttribute("data-close")).addEventListener("click", (e) => hideFancyBox(elem, e));
};
initFancyBoxs();