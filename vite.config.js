module.exports = {
  root: 'src',
  build: {
    outDir: '../dist'
  },
  resolve: {
    alias:{
      'three/addons/' : 'three/examples/jsm/'
    },
  }
}