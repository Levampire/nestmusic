// 引入默认图片
import baseImg from '@/assets/img/coverimg.png';

let timer = null;
// 创建一个监听器
let observer = new IntersectionObserver((entries)=>{
    // entries是所有被监听对象的集合
    entries.forEach(entry =>{
        if(entry.isIntersecting || entry.intersectionRatio>0){
            // 当被监听元素到临界值且未加载图片时触发。
            !entry.target.isLoaded  && showImage(entry.target,entry.target.data_src)
        }
    })
})
function showImage(el,imgSrc){
    const img = new Image();
    img.src = imgSrc;
    img.onload = ()=>{
        el.src = imgSrc;
        el.isLoaded = true;
    }
}
export default {
    // 这里用inserted和bind都行，因为IntersectionObserver时异步的，以防意外还是用inserted好一点
    // inserted和bind的区别在于inserted时元素已经插入页面，能够直接获取到dom元素的位置信息。
    inserted(el,binding,vnode) {
        clearTimeout(timer)
        // 初始化时展示默认图片
        el.src = baseImg;
        // 将需要加载的图片地址绑定在dom上
        el.data_src = binding.value;
        // 将对应dom添加到监听队列
        observer.observe(el)

        // 防抖，在组件卸载的时候停止监听
        const vm = vnode.context;
        timer = setTimeout(() => {
            vm.$on('hook:beforeDestroy', () => {
                observer.disconnect();
            })
        }, 20);
    },
    // 图片更新触发
    update(el,binding){
        el.isLoaded = false;
        el.data_src = binding.value;
    },
    // unbind不太好，会执行多次，改进一下用组件的beforeDestroy卸载
    // unbind(){
    //   // 停止监听
    //   observer.disconnect();
    // }
}

