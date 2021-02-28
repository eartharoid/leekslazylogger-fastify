module.exports = {
	'env': {
		'commonjs': true,
		'es6': false,
		'browser': false,
		'node': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 2021
	},
	'rules': {
		'indent': [
			'warn',
			'tab'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
	}
};