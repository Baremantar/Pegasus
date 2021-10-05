const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].${ext}`);

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "./dev/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: filename("js"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img",
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "font",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: filename("html"),
      template: "./dev/pug/DevelopPage.pug",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
  },
};
