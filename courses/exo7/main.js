const map = L.map("person-location");
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
}).addTo(map);
let marker = null;

const randomizePerson = () =>
{
	fetch("https://randomuser.me/api/").then(res => res.json()).then(j => 
	{
		const person = j.results[0];
		if (person)
		{
			document.getElementById("person-picture").setAttribute("src", person.picture.medium);
			document.getElementById("person-name").innerText = `${person.name.first} ${person.name.last}`;

			const mailAnchor = document.getElementById("person-email");
			mailAnchor.innerText = person.email;
			mailAnchor.href = `mailto:${mailAnchor.href}`;

			const date = document.getElementById("person-birthday");
			date.setAttribute("datetime", person.dob.date);
			date.innerText = new Date(person.dob.date).toLocaleDateString();
			
			map.setView([person.location.coordinates.latitude, person.location.coordinates.longitude], 5);
			if (marker) 
				map.removeLayer(marker);
			marker = L.marker([person.location.coordinates.latitude, person.location.coordinates.longitude]).addTo(map);
		}
	});
}
randomizePerson();

document.getElementById("randomize").addEventListener("click", () => randomizePerson());