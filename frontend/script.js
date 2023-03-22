// const apiKey = "e64620c4c83e4a1d90095232232103";
// let Clocation = "&q=Vienna";
// let apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}${Clocation}&aqi=no`;

// const updateMediaElement = (rootElement) => {
//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data); // console log the response data
//     })
//     .catch(error => console.error(error));
// };

// const loadEvent = () => {
//   const rootElement = document.getElementById("root");

//   const dateInput = document.createElement("input");
//   dateInput.type = "date";
  
//   dateInput.addEventListener("change", () => {
//     const selectedDate = dateInput.value;
//     apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`;
//     updateMediaElement(rootElement);
//   });
//   rootElement.appendChild(dateInput);

//   updateMediaElement(rootElement);
// };
// window.addEventListener("load", loadEvent);

// const locationInput = document.querySelector("#location");
// const locationList = document.querySelector("#locations");

// const fetchLocations = async () => {

//   const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${locationInput.value}`);
//   const data = await response.json();
//   const locations = data.map(item => item.name);
//   locations.forEach(location => {
//     const option = document.createElement("option");
//     option.value = location;
//     locationList.appendChild(option);
//   });
  
// };

// locationInput.addEventListener("input", fetchLocations);
// const apiKey = "YOUR_API_KEY";

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