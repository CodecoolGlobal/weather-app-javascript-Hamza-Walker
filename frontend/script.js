import { getForecast, getAutocompleteSuggestions } from "./scripts/weatherAPI.js"

const LOCAL_STORAGE_KEY = "app.weather"
const LOCAL_STORAGE_LAST_CITY = `${LOCAL_STORAGE_KEY}.last-city`

main()

async function main() {
	const lastCity = localStorage.getItem(LOCAL_STORAGE_LAST_CITY) ?? "Vienna"
	const forecast = await getForecast(lastCity, 8)

	storeAsLastCity(lastCity)
	updateWidget(forecast)

	city_input.oninput = getSuggestions
	city_input.onchange = handleCityChanged
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

async function handleCityChanged() {
	if (city_input.value === "") return

	const forecast = await getForecast(city_input.value, 8)

	storeAsLastCity(city_input.value)
	updateWidget(forecast)

	city_input.value = ""

	debug.innerText = JSON.stringify(forecast, null, 4)
}

function storeAsLastCity(city) {
	localStorage.setItem(LOCAL_STORAGE_LAST_CITY, city)
}

function updateWidget({ location, current, forecast }) {
	const { name, region, country, localtime } = location
	const { temp_c, is_day, condition, wind_kph, pressure_mb, precip_mm, humidity, cloud, feelslike_c } = current
	const forecasts = forecast.forecastday

	widget_name.innerText = name
	widget_region.innerText = region
	widget_country.innerText = country
	widget_localtime.innerText = Intl.DateTimeFormat("en-us", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		weekday: "long"
	}).format(new Date(localtime))
	widget_temp_c.innerText = temp_c + "°C"
	widget_is_day.innerText = is_day ? "day" : "night"
	widget_condition.src = condition.icon
	widget_wind_kph.innerText = wind_kph + "km/h"
	widget_pressure_mb.innerText = pressure_mb + "mb"
	widget_precip_mm.innerText = precip_mm + "mm"
	widget_humidity.innerText = humidity + "%"
	widget_cloud.innerText = cloud + " cloud?"
	widget_feelslike_c.innerText = feelslike_c + "°C"

	widget_forecast.innerText = forecasts.map((forecast) => JSON.stringify(forecast, null, 2)).join("\n")
}
