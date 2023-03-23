import { getImages } from "./scripts/pexelsAPI.js"
import { weatherIcons } from "./data/weatherIcons.js"
import { getForecast, getAutocompleteSuggestions } from "./scripts/weatherAPI.js"

const LOCAL_STORAGE_KEY = "app.weather"
const LOCAL_STORAGE_LAST_CITY = `${LOCAL_STORAGE_KEY}.last-city`

main()

async function main() {
	const lastCity = localStorage.getItem(LOCAL_STORAGE_LAST_CITY) ?? "Vienna"

	changeCity(lastCity)

	city_input.oninput = getSuggestions
	city_input.onchange = () => changeCity(city_input.value)
}

async function getSuggestions() {
	if (city_input.value === "") return

	const cities = await getAutocompleteSuggestions(city_input.value)
	const options = [...city_options.children]
	options.forEach((option, index) => {
		const city = cities?.[index]
		const suggestion = city ? `${city.name}, ${city.region}, ${city.country}` : ""
		option.value = suggestion
		option.innerText = suggestion
	})
}

async function changeCity(city) {
	if (city === "") return

	const [forecast, images] = await Promise.all([getForecast(city, 8), getImages(city)])
	console.log(forecast, images)

	storeAsLastCity(city)
	updateWidget(forecast, images)
	setBodyBackground(images)

	city_input.value = ""
}

function storeAsLastCity(city) {
	localStorage.setItem(LOCAL_STORAGE_LAST_CITY, city)
}

function setBodyBackground({ photos }) {
	if (!photos?.length) console.log("no photo found!")
	const getRandomId = () => Math.floor(Math.random() * photos.length)
	const randomPic = photos[getRandomId()]
	document.body.style = `background-image: url(${randomPic.src.landscape});`
	ww_background_image.style = `background-image: url(${randomPic.src.portrait})`
}
function updateWidget({ location, current, forecast }, { photos }) {
	const { name, region, country, localtime } = location
	const { temp_c, is_day, condition, wind_kph, pressure_mb, precip_mm, humidity, cloud, feelslike_c } = current
	const forecasts = forecast.forecastday
	const conditionCode = current.condition.code
	const weatherIcon = weatherIcons.find((icon) => icon.code === conditionCode).icon

	console.log(weatherIcons.find((icon) => icon.code === current.condition.code).icon)

	ww_city_name.innerText = name
	ww_city_country.innerText = `${region}, ${country}`
	ww_city_temperature.style = `background-image: url(${
		weatherIcons.find((icon) => icon.code === current.condition.code).icon
	})`
	ww_city_temperature.innerText = temp_c
	ww_city_condition.innerText = condition.text
}
