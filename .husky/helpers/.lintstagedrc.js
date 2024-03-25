const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "node .husky/helpers/rws.js",
    "prettier --write --plugin=prettier-plugin-tailwindcss --plugin=prettier-plugin-organize-imports --plugin=prettier-plugin-embed --plugin=prettier-plugin-sql",
    buildEslintCommand,
  ],
};