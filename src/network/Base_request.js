import axios from 'axios';

export function request(config){
    const instance = axios.create({
        baseURL:'http://127.0.0.1:3000',//接口访问基础url
        timeout:5000,
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
        console.log(error)
    })
    //返回请求的结果数据
   return instance(config)
}
