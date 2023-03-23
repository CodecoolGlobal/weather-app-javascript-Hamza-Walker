import { weatherIcons }from "./data/weatherConditions.js"
import { getForecast, getAutocompleteSuggestions } from "./scripts/weatherAPI.js"

const LOCAL_STORAGE_KEY = "app.weather"
const LOCAL_STORAGE_LAST_CITY = `${LOCAL_STORAGE_KEY}.last-city`

main()

async function main() {
	const lastCity = localStorage.getItem(LOCAL_STORAGE_LAST_CITY) ?? "Vienna"
	const forecast = await getForecast(lastCity, 8)

	storeAsLastCity(lastCity)
	updateWidget(forecast)

const autocompleteInputField = () => {
	input.addEventListener("input", handleInput)
}

const handleInput = () => {
	const userInput = input.value
	const matches = uniqueCityNames
		.filter((city) => city.toLowerCase().startsWith(userInput.toLowerCase()))
		.slice(0, MAX_SUGGESTIONS)

	if (matches.length > 0) {
		clearSuggestions()
		matches.forEach((match) => {
			const suggestion = createSuggestion(match)
			suggestion.addEventListener("click", handleSuggestionClick)
			suggestions.appendChild(suggestion)
		})
	} else {
		clearSuggestions()
	}
}
// getForecast(defaultLocation,3,recieveSuggestions)

const clearSuggestions = () => {
	suggestions.innerHTML = ""
}

const createSuggestion = (match) => {
	const suggestion = document.createElement("div")
	suggestion.classList.add("suggestion")
	suggestion.textContent = match
	return suggestion
}

const handleSuggestionClick = (event) => {
	const suggestion = event.target
	input.value = suggestion.textContent
	selectedCity = suggestion.textContent
	apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity}&days=1`
	clearSuggestions()
	console.log(selectedCity)
	callApiWithCityMatch(apiUrl)
}

const callApiWithCityMatch = (apiUrl) => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.current.condition.code);
            createPreTag(data)
        })
        .catch(error => console.error(error));
	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			createPreTag(data)
		})
		.catch((error) => console.error(error))
}

const createPreTag = (data) => {
	const tag = document.createElement("pre")
	tag.innerText = JSON.stringify(data, null, 2)
	apiInformation.appendChild(tag)
}
autocompleteInputField()

// console.log(weatherIcons)