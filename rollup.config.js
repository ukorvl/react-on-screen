const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs').default;
const replace = require('@rollup/plugin-replace');
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
    globals: isStandalone ? { react: 'React' } : undefined,
    name: isStandalone ? 'ReactOnScreen' : undefined,
    banner: createBanner(packageJson.version),
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      values: { 'process.env.NODE_ENV': JSON.stringify('development') },
    }),
    esbuild({
      minify: true,
    }),
    filesize(),
  ],
  external: ['react', 'react-dom'].concat(isStandalone ? [] : ['hoist-non-react-statics'])
});

/** Generate typings config */
const dtsConfig = {
  input: 'lib/index.ts',
  output: [{ file: packageJson.types, format: "es" }],
  plugins: [dts()],
};

const configs = [
  getConfig({
    input: 'lib/index.ts',
    outputFile: packageJson.main,
    format: 'cjs',
  }),
  getConfig({
    input: 'lib/index.ts',
    outputFile: packageJson.module,
    format: 'esm',
  }),
  getConfig({
    input: 'lib/standalone.ts',
    outputFile: packageJson.unpkg,
    format: 'iife',
    isStandalone: true,
  }),
  dtsConfig
];

module.exports = configs;
