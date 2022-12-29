/**
 * For more info
 * see https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/
 */

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import pkg from "./package.json";

const config = {
  input: "lib/index.js",
  inlineDynamicImports: true,
  output: [
    {
      dir: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    resolve(),
    json(),
    babel({
      babelHelpers: "runtime",
      skipPreflightCheck: true,
      plugins: [],
      presets: ["next/babel"],
    }),
    commonjs(),
  ],
  external: ["react", "rect-dom"],
};

export default config;
