import {request} from 'network/Base_request';

//获取用户详情/user/detail?uid=32953014
export function get_userinfo(uid){
    return request({
        url:'/user/detail?uid='+uid ,
    })
}
//获取用户关注/user/follows?uid=32953014
export function user_follows(uid){
    return request({
        url:'/user/follows?uid='+uid ,
    })
}
//获取用户粉丝/user/follows?uid=32953014
export function user_followeds(uid){
    return request({
        url:'/user/followeds?uid='+uid ,
    })
}//获取用户动态/user/follows?uid=32953014
export function user_event(uid){
    return request({
        url:'/user/event?uid='+uid ,
    })
}
