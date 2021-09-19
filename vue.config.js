module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                //定义目录引用
                'assets':'@/assets',
                'components':'@/components',
                'js':'@/js',
                'views':'@/views',
                'main' : '@/components/content/right_main',
                'layout' : '@/components/common/Vam_Layout',
                'widget' : '@/components/common/widget',
                'items' : '@/components/content/right_main/items',
                'network' : '@/network',
                'utils':'@/utils',
                'directive':'@/directive'
            }
        }
    },
    devServer: {
        port: 8888, // 端口号，如果端口号被占用，会自动提升1
        host: "localhost", //主机名， 127.0.0.1， 真机 0.0.0.0
        https: false, //协议
        open: true, //启动服务时自动打开浏览器访问
        proxy: {  // 开发环境代理配置
            '/dev-api': {  // 意思是当请求是以 dev-api 开头的请求，都走代理
                // 目标服务器地址，代理访问：http://localhost:8001
                target: 'http://localhost:3000',
                changeOrigin: true,// 开启代理服务器，就会给你代理转发
                pathRewrite: {
                    // /dev-api/db.json 最终会转发到 http://localhost:8000/db.json
                    '^/dev-api': '', // 就是将请求地址中的 /dev-api 前缀替换成空的
                }
            }
        }
    },
    lintOnSave: false, // 关闭格式检查
    productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
    // publicPath:'/',
    // outputDir:'dist',
    // assetsDir:'static'
}

