import {request} from 'network/Base_request';

//登录状态查验
export function login_status(){
    const timestamp = Date.now();
    return request({
        url:'/login/status?timerstamp='+timestamp,
    })
}

// 手机登录
export function phone_login(name,pwd){
    return request({
        url:'/login/cellphone?phone='+name+'&password='+pwd,
    })
}
export function email_login(name,pwd){
    return request({
        url:'/login?email='+name+'&password='+pwd,
    })
}
//获得二维码key
export function getERCode_key(){
    const timestamp = Date.now();
    return request({
        url:'/login/qr/key?timerstamp='+timestamp,
    })
}
//获得二维码图片
export function getERCode_create(key){
    const timestamp = Date.now();
    return request({
        url:'/login/qr/create?key='+key+'&qrimg=true&timerstamp='+timestamp,
    })
}
//获得二维码图片状态
export function getERCode_check(key){
    const timestamp = Date.now();
    return request({
        url:'/login/qr/check?key='+key+'&timerstamp='+timestamp,
    })
}
//登出/logout
export function logout(key){
    return request({
        url:'/logout'
    })
}
