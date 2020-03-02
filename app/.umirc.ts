import { IConfig } from 'umi-types';
// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme: {
    'primary-color': '#4e8ef7',
    'font-size-base': '12px',
    'border-radius-base': '1px',
    'border-color-base': '#ebeef5',
    'border-color-inverse': '@primary-color',
    'border-color-split': '#ebeef5'
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'app',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};

export default config;
