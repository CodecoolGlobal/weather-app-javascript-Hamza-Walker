export default class {
	#container = null

	get container() {
		return this.#container
	}

	constructor(tag) {
		this.#container = document.createElement(tag)
	}

	setId(id) {
		this.#container.id = id
		return this
	}
	appendContent(content) {
		if (Array.isArray(content)) this.#container.append(...content)
		else this.#container.append(content)
		return this
	}
	setContent(content) {
		this.#container.innerHTML = ""
		this.appendContent(content)
		return this
	}
	addCssClass(className) {
		return this.#arrayHandler(className, (cn) => this.#container.classList.add(cn))
	}
	removeCssClass(className) {
		return this.#arrayHandler(className, (cn) => this.#container.classList.remove(cn))
	}
	toggleCssClass(className) {
		return this.#arrayHandler(className, (cn) => this.#container.classList.toggle(cn))
	}
	addCallback(callback) {
		return this.#arrayHandler(callback, (cb) => this.#container.addEventListener(callback.type, callback.callback))
	}
	addTo(container) {
		container.append(this.#container)
		return this
	}
	remove() {
		this.#container.remove()
		return this
	}

	#arrayHandler(thing, callback) {
		if (Array.isArray(thing)) thing.forEach((t) => this.#arrayHandler(t, callback))
		else callback(thing)
		return this
	}
}
