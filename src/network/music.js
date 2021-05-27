import {request} from 'network/Base_request';

//热门电台
export function radio_hot(){
    return request({
        url:'/dj/recommend'
    })
}
//最近播放: type=1 时只返回 weekData, type=0 时返回 allData
export function user_record(user_uid,type){
    return request({
        url:'/user/record?uid='+user_uid+'&type='+type
    })
}
//新碟上架/top/album?offset=0&limit=30&year=2019&month=6
// limit: 取出数量 , 默认为 50
//
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
//
// area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
//
// type : new:全部 hot:热门,默认为 new
//
// year : 年,默认本年
//
// month : 月,默认本月
export function top_album(limit){
    return request({
        url:'top/album?limit='+limit+'&area=ALL'+'&type=new'
    })
}
//搜索可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
//
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
//
// 接口地址 : /search 或者 /cloudsearch(更全)
//
// 调用例子 : /search?keywords= 海阔天空 /cloudsearch?keywords= 海阔天空
export function searchmusic(keyword,type,limit,offset){
    let url;
    switch(type)
    {
        //单曲
        case 1 :{
            url = '/cloudsearch?keywords='+keyword+'&type=1'+'&offset='+offset+'&limit='+limit
            break;
        }
        //专辑
        case 10:{
            url = '/cloudsearch?keywords='+keyword+'&type=10'+'&limit='+limit
            break;
        }
        //歌手
        case 100:{
            url = url = '/cloudsearch?keywords='+keyword+'&type=100'+'&limit='+limit
            break;
        }
        //歌单
        case 1000:{
            url = '/cloudsearch?keywords='+keyword+'&type=1000'+'&limit='+limit
            break;
        }
        //用户
        case 1002:{
            url = '/cloudsearch?keywords='+keyword+'&type=1002'+'&limit='+limit
            break;
        }//电台
        case 1009:{
            url = '/cloudsearch?keywords='+keyword+'&type=1009'+'&limit='+limit
            break;
        }
        case 1004:{
            url = '/cloudsearch?keywords='+keyword+'&type=1004'+'&limit='+limit
            break;
        }
        case 1018:{
            url = '/cloudsearch?keywords='+keyword+'&type=1018'+'&limit='+limit+'&offset=1'
            break;
        }
        default:{
            url = '/cloudsearch?keywords='+keyword+'&type=1'+'&limit='+limit
            break;
        }
    }
    return request({
        url:url
    })
}
// 所有榜单内容摘要
// 说明 : 调用此接口,可获取所有榜单内容摘要
// /toplist/detail
export function top_list(){
    return request({
        url:'/toplist/detail'
    })
}
//歌单详情
export function playlist_detail(playlist_id){
    return request({
        url:'/playlist/detail?id='+playlist_id
        //url:'/playlist/detail?id='+playlist_id+'&limit=4'
    })
}
//相关歌单
export function related_playlist(playlist_id){
    return request({
        url:'/related/playlist?id='+playlist_id
    })
}
//相关歌单/user/playlist
export function user_playlist(user_uid){
    return request({
        url:'/user/playlist?uid='+user_uid
    })
}

//相关歌单/recommend/resource
export function recommend_resource(){
    return request({
        url:'/recommend/resource'
    })
}

//相关歌单/personal_fm
export function personal_fm(){
    return request({
        url:'/personal_fm'
    })
}

//相关歌单/personalized/djprogram
export function personalized_djprogram(){
    return request({
        url:'/personalized/djprogram'
    })
}
//歌词获取 /lyric?id=33894312
export function music_lyrics(id){
    return request({
        url:'lyric?id='+id
    })
}
//歌词获取 /artist/detail?id=11972054
export function artist_detail(id){
    return request({
        url:'/artist/detail?id='+id
    })
}
