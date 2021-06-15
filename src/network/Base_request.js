import axios from 'axios';
import msgbox from 'utils/messageBox'

const BaseUrl = '/dev-api'
export function request(config){
    const instance = axios.create({
        baseURL:BaseUrl,//接口访问基础url
        timeout:5000,
        withCredentials: true
    })
    //请求拦截
    instance.interceptors.request.use(config=>{
        //放行
        return config;
    },error => {
        console.log(error)
    })
    //响应拦截
    instance.interceptors.response.use(result=>{
        //放行
        return result;
    },error => {
        console.log(error.response)
        if(error.response.data.code===301){
            console.log('需要登录')
            msgbox.msgbox('请登录账号后重试','success')
        }
    })
    //返回请求的结果数据
   return instance(config)
}
