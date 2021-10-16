const input = document.getElementById("form-cb-input");
const validate = document.getElementById("form-validate");

const isLuhnValidate = (code) =>
{
	if (code.length < 1)
		return false;

	code = code.replace(/\s/g, "");
	let sum = 0;

	const parity = code.length % 2;
	for (let i = code.length - 1; i >= 0; i--)
	{
		let d = parseInt(code[i], 10);
		if (i % 2 === parity)
			d *= 2;
		if (d > 9)
			d -= 9;
		sum += d;
	}
	return sum % 10 == false;
}

const onFormValidate = (e) =>
{
	e.preventDefault();
	const isCodeValid = isLuhnValidate(input.value);

	validate.innerText = isCodeValid ? "Valid !" : "Invalid !";
	validate.style.color = isCodeValid ? "green" : "red";
}

document.getElementById("form-cb").addEventListener("submit", onFormValidate);