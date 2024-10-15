const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,

  // Añadimos la configuración de publicPath
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pjud9/' // Reemplaza 'NOMBRE_DEL_REPOSITORIO' con el nombre de tu repositorio de GitHub
    : '/',

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  }
})
