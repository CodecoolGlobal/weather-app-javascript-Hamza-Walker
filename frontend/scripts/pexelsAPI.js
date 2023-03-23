// https://www.pexels.com/api/documentation/?language=javascript

// NoUpHpQ54rmvSQUL0Us2BPYmWyWctQBekMUaAV4bQI5ZVSKxYPjudcHu

const PEXELS_API_URL = "https://api.pexels.com/v1/"
const IMAGE_SEARCH_ENDPOINT = "search"

const api = axios.create({
	baseURL: PEXELS_API_URL,
	method: "get",
	headers: { Authorization: "NoUpHpQ54rmvSQUL0Us2BPYmWyWctQBekMUaAV4bQI5ZVSKxYPjudcHu" }
})
const abortControllers = {
	imageSearch: null
}

export async function getImages(searchString) {
	const searchParams = new URLSearchParams({ query: searchString })

	if (abortControllers.imageSearch) abortControllers.imageSearch.abort()
	abortControllers.imageSearch = new AbortController()

	try {
		const response = await api.get(IMAGE_SEARCH_ENDPOINT, {
			params: searchParams,
			signal: abortControllers.imageSearch.signal
		})
		return response.data
	} catch (error) {
		if (axios.isCancel(error)) console.log("axios: request canceled")
		else throw error
	}
}
