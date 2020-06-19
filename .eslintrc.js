module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module'
	},
	parser: "vue-eslint-parser",
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: [
		"plugin:vue/essential", "eslint:recommended"
	],
	rules: {

	},
	parserOptions: {
		parser: "babel-eslint"
	}
}