import {request} from 'network/Base_request';
const timestamp = Date.now();
//主页信息获取
export function homepage_info(){
    return request({
        url:'/homepage/block/page?refresh=true',
    })
}
//热门搜索获取
export function search_hot(){
    return request({
        url:'/search/hot/detail',
    })
}
//新歌速递 全部 0 华语 7 欧美 96 日本 8 韩国 16
export function new_songs(type){
    return request({
        url:'/top/song?type='+type,
    })
}
//精品歌单标签列表
//说明 : 调用此接口 , 可获取精品歌单标签列表
export function playlist_highquality(){

    return request({
        url:'/top/playlist/highquality?before='+timestamp+'&limit=10',
    })
}
//今日优选电台
export function dj_Todayperfered(){
    return request({
        url:'/dj/today/perfered',
    })
}
