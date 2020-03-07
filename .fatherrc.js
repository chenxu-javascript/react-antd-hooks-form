import commonjs from 'rollup-plugin-commonjs';
export default {
  entry: "src/index.ts",
  cjs: "rollup",
  esm: "rollup",
  extraRollupPlugins: [commonjs({
      include: 'node_modules/**',  // Default: undefined
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
      ignoreGlobal: false,  // Default: false
      sourceMap: false,  // Default: true
    })
  ],
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
};
