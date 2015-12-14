/* eslint-disable */
module.exports = {
	"env": {
		"es6": true,
	},
	"rules": {
		"strict": [2, "global"],

		"no-shadow": 0,
		"no-shadow-restricted-names": 2,
		"no-unused-vars": [2, {
			"vars": "local",
			"args": "after-used"
		}],
		"no-use-before-define": [2, "nofunc"],
		"no-undef": 2,
		"no-var": 2,
		"prefer-const": 2,
		"no-const-assign": 2,

		"no-cond-assign": [2, "always"],
		"no-console": 1,
		"no-debugger": 1,
		"no-alert": 1,
		"no-constant-condition": 1,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-empty": 2,
		"no-ex-assign": 2,
		"no-extra-boolean-cast": 0,
		"no-extra-semi": 2,
		"no-func-assign": 2,
		"no-inner-declarations": 2,
		"no-invalid-regexp": 2,
		"no-irregular-whitespace": 2,
		"no-obj-calls": 2,
		"no-sparse-arrays": 2,
		"no-unreachable": 2,
		"use-isnan": 2,
		"block-scoped-var": 2,

		"consistent-return": 2,
		"curly": 2,
		"default-case": 2,
		"dot-notation": [2, {
			"allowKeywords": true
		}],
		"eqeqeq": 2,
		"guard-for-in": 2,
		"no-caller": 2,
		"no-else-return": 2,
		"no-eq-null": 2,
		"no-eval": 2,
		"no-extend-native": 2,
		"no-extra-bind": 2,
		"no-fallthrough": 2,
		"no-floating-decimal": 2,
		"no-implied-eval": 2,
		"no-lone-blocks": 2,
		"no-loop-func": 2,
		"no-mixed-spaces-and-tabs": 2,
		"no-multi-str": 2,
		"no-native-reassign": 2,
		"no-new": 2,
		"no-new-func": 2,
		"no-new-wrappers": 2,
		"no-octal": 2,
		"no-octal-escape": 2,
		"no-param-reassign": 0,
		"no-redeclare": 2,
		"no-return-assign": 2,
		"no-script-url": 2,
		"no-self-compare": 2,
		"no-sequences": 2,
		"no-throw-literal": 2,
		"no-with": 2,
		"radix": 2,
		"wrap-iife": [2, "any"],
		"yoda": 2,

		"max-len": [2, 100, 2],
		"indent": [2, "tab", {
			"SwitchCase": 1
		}],
		"brace-style": [2,
			"1tbs", {
			"allowSingleLine": false
		}],
		"quotes": [
			2, "single", "avoid-escape"
		],
		"camelcase": [2, {
			"properties": "never"
		}],
		"comma-dangle": [2, "always-multiline"],
		"comma-spacing": [2, {
			"before": false,
			"after": true
		}],
		"comma-style": [2, "last"],
		"eol-last": 2,
		"func-names": 2,
		"key-spacing": [2, {
			"beforeColon": false,
			"afterColon": true
		}],
		"new-cap": [2, {
			"newIsCap": true
		}],
		"no-multiple-empty-lines": [2, {
			"max": 1
		}],
		"no-nested-ternary": 2,
		"no-new-object": 2,
		"no-spaced-func": 2,
		"no-trailing-spaces": 2,
		"no-extra-parens": [2, "functions"],
		"no-underscore-dangle": 0,
		"one-var": [2, "never"],
		"padded-blocks": [2, "never"],
		"semi": [2, "never"],
		"semi-spacing": [2, {
			"before": false,
			"after": true
		}],
		"space-after-keywords": 2,
		"space-before-blocks": 2,
		"space-before-function-paren": [2, "never"],
		"space-infix-ops": 2,
		"space-return-throw-case": 2,
		"spaced-comment": [2, "always", {
			"exceptions": ["-", "+"],
			"markers": ["=", "!"]
		}],
		"object-curly-spacing": [2, "always"],
		"array-bracket-spacing": [2, "never"],
	},
}