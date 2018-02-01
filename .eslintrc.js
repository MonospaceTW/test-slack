module.exports = {
    "extends": "google",
    "rules": {
        "max-len": ["error", {"code": 200, "ignoreComments": true, "ignoreUrls": true   }],
    },
    "parserOptions": {
        "ecmaVersion": 8,
      }
};