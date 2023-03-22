const WEATHER_API_URL = "https://api.weatherapi.com/v1"
const FORECAST_ENDPOINT = "forecast.json"
const AUTOCOMPLETE_ENDPOINT = "search.json"

const api = axios.create({ baseURL: WEATHER_API_URL, method: "get" })
const defaultParams = {
	// it really should not be here
	key: "d1af5dff2c5f470a98564015232003"
}
const abortControllers = {
	forecast: null,
	autocomplete: null
}

export async function getForecast(name, days = 2) {
	const searchParams = new URLSearchParams({ ...defaultParams, q: name, days: 3 })

	if (abortControllers.forecast) abortControllers.forecast.abort()
	abortControllers.forecast = new AbortController()

	try {
		const response = await api.get(FORECAST_ENDPOINT, {
			params: searchParams,
			signal: abortControllers.forecast.signal
		})
		return response.data
	} catch (error) {
		if (axios.isCancel(error)) console.log("axios: request canceled")
		else throw error
	}
}

export async function getAutocompleteSuggestions(name, onDataReceivedCallback) {
	const searchParams = new URLSearchParams({ ...defaultParams, q: name })

	if (abortControllers.autocomplete) abortControllers.autocomplete.abort()
	abortControllers.autocomplete = new AbortController()

	try {
		const response = await api.get(AUTOCOMPLETE_ENDPOINT, {
			params: searchParams,
			signal: abortControllers.autocomplete.signal
		})
		return response.data
	} catch (error) {
		if (axios.isCancel(error)) console.log("axios: request cancelled")
		else throw error
	}
}
