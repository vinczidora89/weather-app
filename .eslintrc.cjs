/* eslint-env node */
module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  "env": {
    "vue/setup-compiler-macros": true,
    "node": true,
    "browser": true,
    "es6": true
  },
  "overrides": [
    {
      "files": [
        "**/__tests__/*.spec.{js,ts,jsx,tsx}",
        "cypress/integration/**.spec.{js,ts,jsx,tsx}"
      ],
      "extends": [
        "plugin:cypress/recommended"
      ]
    }
  ]
}
