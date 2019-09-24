const globalSassFiles = ['@/sass/_veutify.scss'];

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/sass/_vuetify.sass"`,
      },
      scss: {
        data: `@import "@/sass/_vuetify.scss";`,
      },
    },
  },
};
