const path = require('path')

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ["./node_modules", "./src/assets"],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/core'),
        '@api': path.resolve(__dirname, 'src/core/api'),
        '@actions': path.resolve(__dirname, 'src/api_actions'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@axios': path.resolve(__dirname, 'src/libs/axios.js'),
        '@validations': path.resolve(__dirname, 'src/core/util/validations/validations.js'),
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: "src",
          image: "xlink:href",
          "b-avatar": "src",
          "b-img": "src",
          "b-img-lazy": ["src", "blank-src"],
          "b-card": "img-src",
          "b-card-img": "src",
          "b-card-img-lazy": ["src", "blank-src"],
          "b-carousel-slide": "img-src",
          "b-embed": "src",
        };
        options.postcss = [require('postcss-rtl')()]
        return options;
      });
  },
};
