// Initialize code editor
let editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");
editor.session.setMode("ace/mode/json");

/**
 * Merge groups that aren't full to a previous group.
 * @param {*} groups - Array containing objects.
 */
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

/**
 * Split an array by the specified amount.
 * @param {*} group - Array.
 * @param {*} number - Split groups by this amount.
 */
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

/**
 * Shuffle the array.
 * @param {*} group - Array.
 */
const shuffleArray = (group) =>
{
	for (let i = group.length - 1; i > 0; i--) 
	{
		let rnd = Math.floor(Math.random() * (i + 1));
		[group[i], group[rnd]] = [group[rnd], group[i]];
	}
	return group;
}

/**
 * Parse the array of objects to return a flat array from a specific key/value.
 * @param {*} groups - Array containing objects.
 * @param {*} key - The key to test.
 * @param {*} value - The value to test.
 */
const mapKeyValue = (groups, key, value) =>
{
	let flatArray = [];
	for (let i = 0; i < groups.length; i++)
	{
		for (let j = 0; j < groups[i].length; j++)
		{
			if (groups[i][j][key] === value)
				flatArray.push(groups[i][j]);
		}
	}
	return flatArray;
}

/**
 * Sort the array of objects by the key genre
 * @param {*} groups - Array containing objects.
 */
const sortByGenre = (groups) =>
{
	let newGroups = [];
	let personCount = 0;
	
	const male = mapKeyValue(groups, "genre", "male");
	const female = mapKeyValue(groups, "genre", "female");

	for (let i = 0; i < groups.length; i++)
	{
		newGroups[i] = [];
		for (let j = 0; j < groups[i].length; j++)
		{
			if (personCount % 2 == true || personCount % 2 == false && female.length <= 0)
				newGroups[i][j] = male.pop();
			else if (female.length > 0)
				newGroups[i][j] = female.pop();
			personCount++;
		}
	}
	return newGroups;
}

// Default promo JSON
const promo = [
	{ "name": "Alexis", "genre": "male" },
	{ "name": "Kévin", "genre": "male" },
	{ "name": "Mickael", "genre": "male" },
	{ "name": "Guillaume", "genre": "male" },
	{ "name": "Christophe", "genre": "male" },
	{ "name": "Majdeddine", "genre": "male" },
	{ "name": "Riyad", "genre": "male" },
	{ "name": "Nadjib", "genre": "male" },
	{ "name": "Jean", "genre": "male" },
	{ "name": "Baptiste", "genre": "male" },
	{ "name": "Cédric", "genre": "male" },
	{ "name": "Olga", "genre": "female" },
	{ "name": "Estefania", "genre": "female" },
	{ "name": "Julie", "genre": "female" },
	{ "name": "Myriam", "genre": "female" },
	{ "name": "Audrey", "genre": "female" },
	{ "name": "Emilie", "genre": "female" },
	{ "name": "Chloé", "genre": "female" },
	{ "name": "Lisa", "genre": "female" },
	{ "name": "Déborrah", "genre": "female" },
	{ "name": "Mathilde", "genre": "female" }
];

/**
 * Randomize team members and group by a specific value, and can be sorted by genre.
 */
const randomizeTeam = () =>
{
	let randomSplitSize = !$("#form-team-split").val() ? Math.floor((Math.random() * 8) + 2)
		: parseInt($("#form-team-split").val(), 10);

	const group = JSON.parse(editor.getValue());
	const randomPromo = shuffleArray(group);
	const splitPromo = splitGroupBy(randomPromo, randomSplitSize);
	let finalPromo = mergeGroupNotFull(splitPromo);
	if ($("#team-genre-sorted").is(":checked"))
		finalPromo = sortByGenre(finalPromo);

	// Clear previous childrens
	$("#team-members").empty();
	for (let i = 0; i < finalPromo.length; i++)
	{
		// Create a team div
		let team = $(`<div>Team ${String.fromCharCode(97 + i).toUpperCase()}</div>`);
		team.addClass("team py-2 d-flex flex-column align-items-center justify-content-center text-white shadow");

		// Add all persons in the team div
		for (let j = 0; j < finalPromo[i].length; j++)
		{
			let person = $("<div></div>");
			person.addClass("team-person d-flex justify-content-between align-items-center");

			let name = $(`<p>${finalPromo[i][j].name}</p>`);
			name.addClass("text-white h-100 p-3");
			person.append(name);

			let genre = $(`<span>${finalPromo[i][j].genre[0].toUpperCase()}</span>`);
			genre.addClass("team-genre text-white text-center h-100 p-2");
			genre.css("background-color", finalPromo[i][j].genre === "male" ? "slateblue" : "magenta");
			person.append(genre);

			team.append(person);
		}
		$("#team-members").append(team);
	}
}

$(window).on("load", () =>
{
	// Team randomizer button
	$("#team-randomize").on("click", () => randomizeTeam());
	// Editor default value
	editor.setValue(JSON.stringify(promo, null, '\t'), -1);
	// Randomize on page load
	randomizeTeam();
});
