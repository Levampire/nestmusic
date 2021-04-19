import axios from 'axios';

export function request(config){
    const instance = axios.create({
        baseURL:'http://127.0.0.1',//接口访问基础url
        timeout:5000,
    })
    //请求拦截
    instance.interceptors.request.use(config=>{
        //放行
        return config;
    },error => {

    })
    //响应拦截
    instance.interceptors.response.use(result=>{
        //放行
        return result;
    },error => {

    })

}
