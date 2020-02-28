import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import less from 'rollup-plugin-less';
export function getConfig({
  tsconfig = './tsconfig.json',
  output = [
    {
      file: `dist/${pkg.name}.js`,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: `dist/${pkg.name}.es.js`,
      format: 'esm',
    },
  ],
  plugins = [less()],
} = {}) {
  return {
    input: 'src/index.ts',
    external: ['react', 'react-dom', 'antd', 'react-hook-form', 'classnames'],
    plugins: [
      typescript({
        tsconfig,
        clean: true,
      }),
      ...plugins
    ],
    output
  };
}

export default getConfig();
