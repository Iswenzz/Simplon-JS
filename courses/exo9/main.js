const alpha = "abcdefghijklmnopqrstuvwxyz";
const alphaMatrix5 = [
	["a", "b", "c", "d", "e"],
	["f", "g", "h", "i", "j"],
	["k", "l", "m", "n", "o"],
	["p", "q", "r", "s", "t"],
	["u", "v", "w", "x", "y", "z"]
];

const cesarEncode = (str, keyGap) =>
{
	let newStr = "";
	for (const c of str.toLowerCase())
	{
		let index = alpha.indexOf(c) + keyGap;
		if (index >= alpha.length)
			index -= alpha.length;

		newStr += alpha[index];
	}
	return newStr;
};

const cesarDecode = (str, keyGap) =>
{
	let newStr = "";
	for (const c of str.toLowerCase())
	{
		let index = alpha.indexOf(c) - keyGap;
		if (index < 0)
			index += alpha.length;

		newStr += alpha[index];
	}
	return newStr;
};

const polybeEncode = (str) =>
{
	let newString = "";
	for (const c of str)
	{
		const val = alphaMatrix5.map((r, i) => (r.indexOf(c) >= 0) ? { 
			x: i + 1, 
			y: r.indexOf(c) + 1
		} : null).filter(i => i).shift();
		newString += `${val.x}${val.y}`;
	}
	return newString;
};

const polybeDecode = (str) =>
{
	let newString = "";
	for (let i = 0; i < str.length; i += 2)
	{
		const indexX = parseInt(str[i], 10) - 1;
		const indexY = parseInt(str[i + 1], 10) - 1;
		newString += alphaMatrix5[indexX][indexY];
	}
	return newString;
}

const main = () =>
{
	const test = prompt();

	// const enc = cesarEncode(test, 3);
	// const dec = cesarDecode(enc, 3);

	const enc = polybeEncode(test);
	const dec = polybeDecode(enc);

	console.log(enc);
	console.log(dec);
};
main();