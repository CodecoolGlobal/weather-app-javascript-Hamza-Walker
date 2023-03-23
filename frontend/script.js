import {getForecast,getAutocomplete} from "./apiConnector.js"
const root = document.body
const defaultLocation = "Vienna"
const input = document.getElementById("city")
const suggestions = document.getElementById("suggestions")

// root.appendChild(input)


input.oninput = (event) => {
    const inputText = event.target.value
    getAutocomplete(inputText,recieveSuggestions)
}
// getForecast(defaultLocation,3,recieveSuggestions)

function recieveSuggestions(data){
    console.log(data)
    const something = data.map()
    suggestions.innerText = data.location.name


}

// const cityNames = cities.map((city) => city.name)
// const uniqueCityNames = [...new Set(cityNames)]

// // const MAX_SUGGESTIONS = 8
// const input = document.getElementById("city")
// const suggestions = document.getElementById("suggestions")
// const apiInformation = document.getElementById("debugoutput")

// const autocompleteInputField = () => {
// 	input.addEventListener("input", handleInput)
// }

// const handleInput = () => {
// 	const userInput = input.value
//     getAutocomplet(input.value,console.log)
	// const matches = uniqueCityNames
	// 	.filter((city) => city.toLowerCase().startsWith(userInput.toLowerCase()))
	// 	.slice(0, MAX_SUGGESTIONS)

	// if (matches.length > 0) {
	// 	clearSuggestions()
	// 	matches.forEach((match) => {
	// 		const suggestion = createSuggestion(match)
	// 		suggestion.addEventListener("click", handleSuggestionClick)
	// 		suggestions.appendChild(suggestion)
	// 	})
	// } else {
	// 	clearSuggestions()
	// }
// }

// const clearSuggestions = () => {
// 	suggestions.innerHTML = ""
// }

// const createSuggestion = (match) => {
// 	const suggestion = document.createElement("div")
// 	suggestion.classList.add("suggestion")
// 	suggestion.textContent = match
// 	return suggestion
// }

// const handleSuggestionClick = (event) => {
// 	const suggestion = event.target
// 	input.value = suggestion.textContent
// 	selectedCity = suggestion.textContent
// 	apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity}&days=1`
// 	clearSuggestions()
// 	console.log(selectedCity)
//     getForecast(selectedCity,5,console.log)
// }

// const callApiWithCityMatch = (apiUrl) => {
    
// 	fetch(apiUrl)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			console.log(data)
// 			createPreTag(data)
// 		})
// 		.catch((error) => console.error(error))
// }

// const createPreTag = (data) => {
// 	const tag = document.createElement("pre")
// 	tag.innerText = JSON.stringify(data, null, 2)
// 	apiInformation.appendChild(tag)
// }
// autocompleteInputField()
