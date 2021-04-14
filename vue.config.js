module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                //定义目录引用
                'assets':'@/assets',
                'components':'@/components',
                'js':'@/js'
            }
        }
    }
}
