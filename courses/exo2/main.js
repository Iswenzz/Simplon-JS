// Initialize code editor
let parseMode = {
	json: {
		content: [
			{ "name": "Alexis", "genre": "male", "level": "3" },
			{ "name": "Kévin", "genre": "male", "level": "3" },
			{ "name": "Mickael", "genre": "male", "level": "2" },
			{ "name": "Guillaume", "genre": "male", "level": "2" },
			{ "name": "Christophe", "genre": "male", "level": "1" },
			{ "name": "Majdeddine", "genre": "male", "level": "1" },
			{ "name": "Riyad", "genre": "male", "level": "1" },
			{ "name": "Nadjib", "genre": "male", "level": "2" },
			{ "name": "Jean", "genre": "male", "level": "3" },
			{ "name": "Baptiste", "genre": "male", "level": "2" },
			{ "name": "Cédric", "genre": "male", "level": "1" },
			{ "name": "Olga", "genre": "female", "level": "2" },
			{ "name": "Estefania", "genre": "female", "level": "1" },
			{ "name": "Julie", "genre": "female", "level": "3" },
			{ "name": "Myriam", "genre": "female", "level": "1" },
			{ "name": "Audrey", "genre": "female", "level": "2" },
			{ "name": "Emilie", "genre": "female", "level": "2" },
			{ "name": "Chloé", "genre": "female", "level": "1" },
			{ "name": "Lisa", "genre": "female", "level": "1" },
			{ "name": "Déborrah", "genre": "female", "level": "2" },
			{ "name": "Mathilde", "genre": "female", "level": "2" }
		],
		active: true
	},
	csv: {
		content: [
			"Alexis,male",
			"Kévin,male",
			"Mickael,male",
			"Guillaume,male",
			"Christophe,male",
			"Majdeddine,male",
			"Riyad,male",
			"Nadjib,male",
			"Jean,male",
			"Baptiste,male",
			"Cédric,male",
			"Olga,female",
			"Estefania,female",
			"Julie,female",
			"Myriam,female",
			"Audrey,female",
			"Emilie,female",
			"Chloé,female",
			"Lisa,female",
			"Déborrah,female",
			"Mathilde,female"
		],
		active: false
	}
};
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

/**
 * Parse the CSV editor output back to a useable JSON.
 * @param {*} group - CSV group array.
 */
const parseTeamCSV = (group) =>
{
	let newGroup = [];

	for (let i = 0; i < group.length; i++)
	{
		let tkn = group[i].split(",");
		newGroup.push({
			name: tkn[0],
			genre: tkn[1]
		});
	}
	return newGroup;
}

/**
 * Randomize team members and group by a specific value, and can be sorted by genre.
 */
const randomizeTeam = () =>
{
	const randomSplitSize = !($("#form-team-split").val()) ? Math.floor((Math.random() * 8) + 2)
		: parseInt($("#form-team-split").val(), 10);
	const group = parseMode["json"].active 
		? JSON.parse(editor.getValue()) : parseTeamCSV(editor.getValue().split("\n"));

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
	// Page events
	$("#team-randomize").on("click", () => randomizeTeam());
	$("#editor-json").on("click", () => 
	{
		if (parseMode["csv"].active)
		{
			[parseMode["csv"].active, parseMode["json"].active] = [parseMode["json"].active, parseMode["csv"].active];
			parseMode["csv"].content = editor.getValue().split("\n");
			editor.setValue(JSON.stringify(parseMode["json"].content, null, '\t'), -1);
		}
	});
	$("#editor-csv").on("click", () => 
	{
		if (parseMode["json"].active)
		{
			[parseMode["json"].active, parseMode["csv"].active] = [parseMode["csv"].active, parseMode["json"].active];
			parseMode["json"].content = JSON.parse(editor.getValue());
			editor.setValue(parseMode["csv"].content.join("\n"), -1);
		}
	});

	// Editor default value
	editor.setValue(JSON.stringify(parseMode["json"].content, null, '\t'), -1);
	// Randomize on page load
	randomizeTeam();
});
