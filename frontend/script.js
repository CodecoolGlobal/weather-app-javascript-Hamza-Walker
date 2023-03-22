const apiKey = "e64620c4c83e4a1d90095232232103";
let selectedCity = "";
let apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${selectedCity}`;
const cityNames = cities.map(city => city.name);
const uniqueCityNames = [...new Set(cityNames)];

const autocompleteInputField = () => {
	
	const input = document.getElementById("city");
	const suggestions = document.getElementById("suggestions");
	const MAX_SUGGESTIONS = 8;
	
	input.addEventListener("input", () => {
	  const userInput = input.value;
	  const matches = uniqueCityNames.filter(city => city.toLowerCase().startsWith(userInput.toLowerCase())).slice(0, MAX_SUGGESTIONS);
	
	  if (matches.length > 0) {
	    suggestions.innerHTML = "";
	    
	    matches.forEach(match => {
	      const suggestion = document.createElement("div");
	      suggestion.classList.add("suggestion");
	      suggestion.textContent = match;
	      suggestion.addEventListener("click", () => {
	        input.value = match;
	        selectedCity = match;
	        apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${selectedCity}`; // update apiUrl
	        suggestions.innerHTML = "";
	        console.log(selectedCity)
            callApiWithCityMatch(apiUrl) 
	      });
	      suggestions.appendChild(suggestion);
	    });
	  } else {
	    suggestions.innerHTML = "";
	  }
	});
}
autocompleteInputField()

const callApiWithCityMatch = (apiUrl) => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
        })
        .catch(error => console.error(error));
}