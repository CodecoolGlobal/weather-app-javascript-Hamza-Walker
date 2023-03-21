import express from "express"
import fs from "node:fs/promises"

const CONFIG_FILE_PATH = "./server/config.json"

try {
	const config = JSON.parse(await fs.readFile(CONFIG_FILE_PATH, { encoding: "utf-8" }))

	main(config)
} catch (error) {
	console.log(`Error: Missing '${CONFIG_FILE_PATH}'`)
	console.log("-----------------------------------------------------------")
	console.log(`Create '${CONFIG_FILE_PATH}' with the following keys`)
	console.log("\tPORT")
	console.log("\tLOCAL_STORAGE_PREFIX")
	console.log("\tWEATHER_API_URL")
	console.log("\tWEATHER_API_KEY")
	console.log()
	console.log("Exiting.")
}

function main(config) {
	const server = express()

	server.use(express.static("web"))

	server.listen(config.PORT, () => {
		console.log(`http://localhost:${config.PORT}/`)
	})
}
