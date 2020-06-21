module.exports = {
  "env": {
    "browser": true,
    "jest": true
  },
  "extends": ["airbnb"],
  "globals": {
    "React": true,
    "fetchJsonp": true
  },
  "settings": {
    "import/resolver": {
      "jest": {},
      "webpack": {
        "config": "./config/webpack.config.dev.js"
      }
    }
  },
  "parser": "babel-eslint",
  "rules": {
    "no-underscore-dangle": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "mjs": "never",
        "jsx": "never"
      }
    ],
    "import/prefer-default-export": 0,
    "react/forbid-prop-types": [
      2,
      {
        "forbid": [
          "any"
        ]
      }
    ],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/img-has-alt": 0,
    "jsx-a11y/label-has-for": 0,
  }
};