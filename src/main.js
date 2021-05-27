import {createApp} from 'vue'
import {reactive} from 'vue'
import App from './App.vue'
import router from './router'
import Vainput from 'widget/Va-input'
import Vainputbutton from 'widget/Va-input-button'
import store from "./store/store";
import audio from "./utils/audio";
import Message from "./utils/messageBox";
import Lazyload from './directive/Lazyload.js'



const app = createApp(App);

// 全局注册
app.component('Va-input',Vainput);
app.component('Va-input-button',Vainputbutton);
app.config.globalProperties.$audio = audio
app.config.globalProperties.$msgbox = Message
app.directive('Lazyload',Lazyload)
app.use(reactive)
app.use(router);
app.use(store);
app.mount('#app');
