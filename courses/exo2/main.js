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

const promo = ["Alexis", "Riyad", "Kévin", "Julie", "Emilie", "Olga", "Nadjib", "Jean", "Mickael", "Lisa", "Myriam", "Mathilde", "Cédric", "Estefania", "Baptiste", "Christophe", "Audrey", "Chloé", "Guillaume", "Majdeddine", "Déborrah"];
const randomPromo = randomizeGroup(promo);
const splitPromo = splitGroupBy(randomPromo, 4);
const finalPromo = mergeGroupNotFull(splitPromo);
console.log(finalPromo);