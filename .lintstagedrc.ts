import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((filename) => path.relative(process.cwd(), filename))
    .join(" --file ")}`;

export default {
  "*.{js,jsx,ts,tsx}": buildEslintCommand,
};
