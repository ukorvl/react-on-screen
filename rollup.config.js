const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs').default;
const esbuild = require('rollup-plugin-esbuild').default;
const dts = require('rollup-plugin-dts').default;
const filesize = require('rollup-plugin-filesize');

const packageJson = require('./package.json');

/** Create banner */
const createBanner = (version) => {
  return `/**!
 * ukorvl/react-on-screen v${version}
 *
 * @copyright (c) ukorvl <ukorotovskiy@gmail.com>.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */`;
}

/** Get config to generate js */
const getConfig = ({
  input,
  outputFile,
  format,
  isStandalone = false,
}) => ({
  input,
  output: {
    file: outputFile,
    format,
    sourcemap: true,
    banner: createBanner(packageJson.version),
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    esbuild({
      minify: true,
    }),
    filesize(),
  ],
  external: ['react', 'react-dom', 'hoist-non-react-statics'].concat(isStandalone ? [] : [])
});

/** Generate typings config */
const dtsConfig = {
  input: "lib/index.ts",
  output: [{ file: packageJson.types, format: "es" }],
  plugins: [dts()],
};

const configs = [
  getConfig({
    input: 'lib/index.ts',
    outputFile: packageJson.main,
    format: 'cjs'
  }),
  getConfig({
    input: 'lib/index.ts',
    outputFile: packageJson.module,
    format: 'esm'
  }),
  getConfig({
    input: 'lib/standalone.ts',
    outputFile: 'build/react-on-screen.standalone.js',
    format: 'iife',
    isStandalone: true
  }),
  dtsConfig
];

module.exports = configs;
