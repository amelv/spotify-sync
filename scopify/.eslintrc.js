module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
  "rules": {
     "no-unused-vars": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/no-unescaped-entities": ["error", {"forbid": ['>', '"', '}']}],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        'no-console': 'off',
        "object-curly-spacing": ["error", "never"],
    }
};
