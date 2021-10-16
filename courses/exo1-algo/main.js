const isLeapYear = (year) =>
{
	return (year % 4 == false && year % 100 != false) || year % 400 == false;
}

const reverseString = (str) =>
{
	let s = "";    
	for (let i = str.length - 1; i >= 0; i--)      
	  s += str[i];
	return s;
}

const printLettersDiamond = () =>
{
	const letters = "ABC";
	const n = letters.length;

	for (let i = 0; i < n; ++i)
		console.log(" ".repeat(n - 1 - i) + letters[i].repeat(i + 1));
	for (let i = 0; i < n - 1; ++i)
		console.log(" ".repeat(i + 1) + letters[n - i - 2].repeat(n - i - 1));
}

console.log(isLeapYear(2020));
console.log(isLeapYear(2008));
console.log(isLeapYear(1900));
console.log(reverseString("Hello"));
printLettersDiamond();