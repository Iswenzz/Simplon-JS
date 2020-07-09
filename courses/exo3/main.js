let game = {
	pick: [
		"rock",
		"paper",
		"scissors"
	],
	aiPick: null,
	aiWon: 0,
	usrPick: null,
	usrWon: 0,
}

/**
 * Get a random integer from a specified range.
 * @param {*} min - Min value.
 * @param {*} max - Max value.
 */
const randomIntRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

$(window).on("load", () =>
{
	const usrPick = $("#usr-pick");
	const usrWon = $("#usr-won");
	const aiPick = $("#ai-pick");
	const aiWon = $("#ai-won");
	const gameState = $("#game-state");

	const gameStateChange = (status) =>
	{
		gameState.text(status);
		switch (status)
		{
			case "You Won !":
				gameState.css("color", "green");
				game.usrWon++;
				usrWon.text(`Me: ${game.usrWon}`);
				break;
			case "You Loose !":
				gameState.css("color", "red");
				game.aiWon++;
				aiWon.text(`AI: ${game.aiWon}`);
				break;
			case "You Draw !":
				gameState.css("color", "orange");
				break;
		}
		game.aiPick = null;
		game.usrPick = null;
	}

	/**
	 * End the RPS game and check who won.
	 */
	const endGame = () =>
	{
		switch (game.usrPick)
		{
			case "rock":
				switch (game.aiPick)
				{
					case "scissors":
						gameStateChange("You Won !");
						break;
					case "rock":
						gameStateChange("You Draw !");
						break;
					case "paper":
						gameStateChange("You Loose !");
						break;
				}
				break;
			case "paper":
				switch (game.aiPick)
				{
					case "scissors":
						gameStateChange("You Loose !");
						break;
					case "rock":
						gameStateChange("You Won !");
						break;
					case "paper":
						gameStateChange("You Draw !");
						break;
				}
				break;
			case "scissors":
				switch (game.aiPick)
				{
					case "scissors":
						gameStateChange("You Draw !");
						break;
					case "rock":
						gameStateChange("You Won !");
						break;
					case "paper":
						gameStateChange("You Loose !");
						break;
				}
				break;
		}
	};

	/**
	 * AI pick.
	 */
	const gameAiPick = () =>
	{
		const rand = randomIntRange(0, 2);
		game.aiPick = game.pick[rand];
		aiPick.text(`AI picked: ${game.pick[rand]}`);

		endGame();
	}

	/**
	 * User pick.
	 * @param {*} selection - Choice name.
	 */
	const gameUsrPick = (selection) =>
	{
		if (!game.usrPick)
		{
			game.usrPick = selection;
			usrPick.text(`You picked: ${selection}`);

			gameAiPick();
		}
	}

	$("#btn-rock").on("click", () => gameUsrPick("rock"));
	$("#btn-paper").on("click", () => gameUsrPick("paper"));
	$("#btn-scissors").on("click", () => gameUsrPick("scissors"));
});