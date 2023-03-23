

const API_URL = "https://api.weatherapi.com/v1"

const FORECAST_ENDPOINT = "forecast.json"
const AUTOCOMPLETE_ENDPOINT = "search.json"

const defaultParams = {
	key: "d1af5dff2c5f470a98564015232003"
}

const abortControllers = {
	forecast: null,
	autocomplete: null
}

const api = axios.create({ baseURL: API_URL, method: "get" })

export function getForecast(name, days = 3, onDataReceivedCallback) {
	const searchParams = new URLSearchParams({ ...defaultParams, q: name, days: 3 })

	if (abortControllers.forecast) abortControllers.forecast.abort()
	abortControllers.forecast = new AbortController()

	api.get(FORECAST_ENDPOINT, { params: searchParams, signal: abortControllers.forecast.signal })
		.then((response) => onDataReceivedCallback && onDataReceivedCallback(response.data))
		.catch((error) => {
			if (axios.isCancel(error)) console.log("axios: request canceled")
		})
}

export function getAutocomplete(name, onDataReceivedCallback) {
	const searchParams = new URLSearchParams({ ...defaultParams, q: name })

	if (abortControllers.autocomplete) abortControllers.autocomplete.abort()
	abortControllers.autocomplete = new AbortController()

	api.get(AUTOCOMPLETE_ENDPOINT, { params: searchParams, signal: abortControllers.autocomplete.signal })
		.then((response) => onDataReceivedCallback && onDataReceivedCallback(response.data))
		.catch((error) => {
			if (axios.isCancel(error)) console.log("axios: request canceled")
		})
}
