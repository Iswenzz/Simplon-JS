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

	if (keyIndex !== -1)
	{
		const key = $("#soundboard").find("li").eq(keyIndex);
		key.click();
		key.addClass("soundKeyDown");
	}
}

/**
 * Remove the soundkeydown css class.
 * @param {*} e - Keyup event.
 */
const onSoundboardKeyUp = (e) =>
{
	const keyIndex = Object.keys(board).indexOf(e.keyCode.toString());
	if (keyIndex !== -1)
		$("#soundboard").find("li").eq(keyIndex).removeClass("soundKeyDown");
}

/**
 * Play a sound.
 * @param {*} index - Key index.
 */
const playSoundboardKey = (index) =>
{
	let key = $(`#audio-${Object.values(board)[index]}`).get()[0];
	key.currentTime = 0;
	key.play();
}

$(window).on("load", () =>
{
	$("#soundboard").each(function()
	{
		$(this).find("li").each(function(index)
		{
			$(this).on("click", () => playSoundboardKey(index));
		});
	});
});

$(window).on("keydown", onSoundboardKeyDown);
$(window).on("keyup", onSoundboardKeyUp);