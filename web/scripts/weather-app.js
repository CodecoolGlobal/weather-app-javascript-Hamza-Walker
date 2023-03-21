import html from "./LiquidHTML.js"

const ROOT = document.body

const grid = new html("div").addCssClass("weather-widget").addCssClass("flex-row")
const left = new html("div").addCssClass(["flex-column", "centered"]).setContent("left")
const right = new html("div").addCssClass(["flex-column", "centered"]).setContent("right")

grid.setContent([left.container, right.container]).addTo(ROOT)
