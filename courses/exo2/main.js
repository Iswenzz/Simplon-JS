const mergeGroupNotFull = (groups) =>
{
	for (let i = 0; i < groups.length; i++)
	{
		if (!groups[i].every(i => i !== undefined))
		{
			groups[i - 1] = groups[i - 1].concat(groups[i]).filter(i => i !== undefined);
			delete groups[i];
		}
	}
	return groups.filter(i => i);
}

const splitGroupBy = (group, number) =>
{
	let newGroups = [];

	for (let i = 0; i < group.length / number; i++)
	{
		newGroups[i] = [];
		for (let j = 0; j < number; j++)
			newGroups[i][j] = group[j + (i * number)];
	}
	return newGroups;
}

const randomizeGroup = (group) =>
{
	for (let i = group.length - 1; i > 0; i--) 
	{
		let rnd = Math.floor(Math.random() * (i + 1));
		[group[i], group[rnd]] = [group[rnd], group[i]];
	}
	return group;
}

const promo = [
	{ name: "Alexis", genre: "male" },
	{ name: "Kévin", genre: "male" },
	{ name: "Mickael", genre: "male" },
	{ name: "Guillaume", genre: "male" },
	{ name: "Christophe", genre: "male" },
	{ name: "Majdeddine", genre: "male" },
	{ name: "Riyad", genre: "male" },
	{ name: "Nadjib", genre: "male" },
	{ name: "Jean", genre: "male" },
	{ name: "Baptiste", genre: "male" },
	{ name: "Cédric", genre: "male" },
	{ name: "Olga", genre: "female" },
	{ name: "Estefania", genre: "female" },
	{ name: "Julie", genre: "female" },
	{ name: "Myriam", genre: "female" },
	{ name: "Audrey", genre: "female" },
	{ name: "Emilie", genre: "female" },
	{ name: "Chloé", genre: "female" },
	{ name: "Lisa", genre: "female" },
	{ name: "Déborrah", genre: "female" },
	{ name: "Mathilde", genre: "female" }
]
const randomPromo = randomizeGroup(promo);
const splitPromo = splitGroupBy(randomPromo, Math.floor((Math.random() * 8) + 1));
const finalPromo = mergeGroupNotFull(splitPromo);
console.table(finalPromo);