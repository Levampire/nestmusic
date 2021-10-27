import { createApp } from 'vue'
import main from 'widget/messageBox.vue'

let instance

const initInstance = () => {
    // 在 vue2 的时候，只需 instance.$mount() 便能得到节点，现在不行
    const app = createApp(main)
    // 需要一个容器
    const container = document.createElement('div')
    // 再进行挂载 - 挂载之后返回实例上下文
    instance = app.mount(container)
    document.body.appendChild(container)
}

const msgbox = (option,delay) => {
    if (!instance) initInstance()
    option = typeof option === 'string' ? { content: option,delay:delay } : option
    const defaultOption = {
        content: '',
        delay: 1500,
    }
    for (const key in defaultOption)
        instance[key] = option[key] || defaultOption[key]

    return instance.open()
}


// // 或者挂载在根实例的全局配置上
// export default app => app.config.globalProperties.$Toast = Toast

// 直接导出该方法
export default {
    msgbox
}

// // 或者挂载在根实例的全局配置上
// export default app => app.config.globalProperties.$Toast = Toast
