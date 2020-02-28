import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import less from 'rollup-plugin-less'
export default {
  input: 'src/index.ts',
  plugins: [less(), typescript(), terser()],
  external: ['react', 'react-dom', 'antd', 'react-hook-form', 'classnames'],
  output: [
    {
      file: 'dist/react-hook-form.min.es.js',
      format: 'es',
    },
  ],
};
