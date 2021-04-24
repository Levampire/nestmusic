import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Vainput from 'widget/Va-input'
import Vainputbutton from 'widget/Va-input-button'

const app = createApp(App);

//组件全局注册
app.component('Va-input',Vainput);
app.component('Va-input-button',Vainputbutton);


app.use(router);
app.mount('#app');
