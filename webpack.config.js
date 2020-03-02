const path = require('path');

module.exports = {
  mode: "production", // 生产模式
  entry: {
    // 入口
    Form: path.resolve(__dirname, "./src/index.ts")
  },
  output: {
    // 出口
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].min.js",
    publicPath: "./dist/",
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'ELEMENT',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          },
          {
            loader: "ts-loader" // 解析 ts
          }
        ],
        include: path.resolve(__dirname, "./src/") // 只解析 src 目录下的文件
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]"
                }
              }
            }
          }
        ],
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    // 省略文件后缀时，默认按下面的配置取
    extensions: [".js", ".ts", ".tsx"]
  },
  externals: {
    // 不把 react 打包进去
    react: "react",
    antd: "antd",
    "react-hook-form": "react-hook-form"
  }
};
