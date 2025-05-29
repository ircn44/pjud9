const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pjud9/'
    : '/',

  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // Opciones de Vuetify
    }
  }
})
