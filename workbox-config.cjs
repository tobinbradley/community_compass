module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{css,js,json,ico,html,svg,png,jpg}"
  ],
  "globIgnores": [
    "data/**/*.json",
    "data/**/*.html"
  ],
  "swDest": "build/service-worker.js",
  "sourcemap": false
};
