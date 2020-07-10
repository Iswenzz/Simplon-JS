const board = {
	49: "boom",
	50: "clap",
	51: "hihat",
	52: "kick",
	53: "openhat",
	54: "ride",
	55: "snare",
	56: "tink",
	57: "tom"
}

/**
 * Play a sound and add the soundkeydown css class.
 * @param {*} e - Keydown event.
 */
const onSoundboardKeyDown = (e) =>
{
	const keyIndex = Object.keys(board).indexOf(e.keyCode.toString());
	const key = $("#soundboard").find("li").eq(keyIndex);
	key.trigger("click");
	key.addClass("soundKeyDown");
}

/**
 * Remove the soundkeydown css class.
 * @param {*} e - Keyup event.
 */
const onSoundboardKeyUp = (e) =>
{
	const keyIndex = Object.keys(board).indexOf(e.keyCode.toString());
	$("#soundboard").find("li").eq(keyIndex).removeClass("soundKeyDown");
}

$(window).on("load", () =>
{
	/**
	 * Soundboard click/play sound event.
	 */
	$("#soundboard").each(function()
	{
		$(this).find("li").each(function(index)
		{
			$(this).on("click", () => $(`#audio-${Object.values(board)[index]}`).trigger("play"));
		});
	});
});

$(window).on("keydown", onSoundboardKeyDown);
$(window).on("keyup", onSoundboardKeyUp);