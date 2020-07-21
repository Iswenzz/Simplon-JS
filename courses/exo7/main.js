const randomizePerson = () =>
{
	fetch("https://randomuser.me/api/").then(res => res.json()).then(j => 
	{
		const person = j.results[0];
		if (person)
		{
			console.log(person);
			
			document.getElementById("person-picture").setAttribute("src", person.picture.medium);
			document.getElementById("person-name").innerText = `${person.name.first} ${person.name.last}`;

			const mailAnchor = document.getElementById("person-email");
			mailAnchor.innerText = person.email;
			mailAnchor.href = `mailto:${mailAnchor.href}`;

			const date = document.getElementById("person-birthday");
			date.setAttribute("datetime", person.dob.date);
			date.innerText = new Date(person.dob.date).toLocaleDateString();
		}
	});
}
randomizePerson();

document.getElementById("randomize").addEventListener("click", () => randomizePerson());