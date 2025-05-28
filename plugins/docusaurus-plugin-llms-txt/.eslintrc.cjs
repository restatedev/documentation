module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": ["error", { 
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_" 
        }],
        "max-len": ["warn", { 
            code: 100,
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }]
    }
} 