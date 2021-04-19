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
                'items' : '@/components/content/right_main/items'
            }
        }
    }
}
