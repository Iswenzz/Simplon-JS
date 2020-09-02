import readline from "readline-sync";

const unit = [1, 2, 5, 10, 20, 50, 100];
const splitMoney = (price) =>
{
	const ret = {}
	let p = price;

	while (p)
	{
		for (const u of unit.reverse())
		{
			while (p - u >= 0)
			{
				if (!ret[u]) 
					ret[u] = 1;
				else
					ret[u]++;
				p -= u;
			}
		}
	}
	return ret;
};

let answer = "";
while ((answer = readline.question("Split money: (type quit to exit):\n")) !== "quit")
	console.log(splitMoney(parseInt(answer, 10)));