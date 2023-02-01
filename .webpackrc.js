import path from 'path'
module.exports = {
  "extraBabelPlugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "lib",
      "style": "css"
    }]
  ],
  "alias":{
    '@src':path.resolve(__dirname,'./src'),
    '@pages':path.resolve(__dirname,'./src/routes'),
    '@services':path.resolve(__dirname,'./src/services'),
    '@services':path.resolve(__dirname,'./src/services'),
    '@utils':path.resolve(__dirname,'./src/utils'),
  },
  "proxy": {
    "/api": {
        "target": "https://zhidao.baidu.com/question/api",
        "changeOrigin": true,
        "pathRewrite": { "^/api" : "" }
      }
  },
  "publicPath":"/"
}
