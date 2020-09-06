module.exports = {
	plugins: ["security"],
	extends: ["plugin:security/recommended"],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		semi: "error"
	}
};
