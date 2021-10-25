import {request} from 'network/Base_request';

//推荐电台
export function radio_hot(){
    return request({
        url:'/dj/recommend'
    })
}
export function dj_program_detail(id){
    return request({
        url:'/dj/program/detail?id='+id
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
        url:'top/album?offset=0&limit='+limit+'&area=ALL'+'&type=new&year=2019&month=6'
    })
}
export function album(id){
    return request({
        url:'album?id='+id
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
//歌单详情
export function likelist(user_id){
    return request({
        url:'/likelist?uid='+user_id
        //url:'/playlist/detail?id='+playlist_id+'&limit=4'
    })
}
//收藏/取消歌单  t : 类型,1:收藏,2:取消收藏 id : 歌单 id
export function playlist_subscribe(t,playlist_id){
    return request({
        url:'/playlist/subscribe?t='+t+'&id='+playlist_id
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
//歌手详情 /artist/detail?id=11972054
export function artist_detail(id){
    return request({
        url:'/artist/detail?id='+id
    })
}
//热门话题
export function hot_topic(){
    return request({
        url:'/hot/topic'
    })
}
/*获取歌曲详情
说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情

必选参数 : ids: 音乐 id, 如 ids=347230

接口地址 : /song/detail

调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231*/

export function song_detail(ids){
    return request({
        url:'/song/detail?ids='+ids
    })
}

/*喜欢音乐
说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐

必选参数 : id: 歌曲 id

可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢

接口地址 : /like

调用例子 : /like?id=347230*/
export function song_like(id,trueORfalse){
    return request({
        url: '/like?id='+id+'&like='+trueORfalse
    })
}
/*
歌手全部歌曲
说明 : 调用此接口,可获取歌手全部歌曲 必选参数 :

    id : 歌手 id

可选参数 :

    order : hot ,time 按照热门或者时间排序

limit: 取出歌单数量 , 默认为 50

offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值

接口地址 : /artist/songs

调用例子 : /artist/songs?id=6452
*/
export function artist_songs(id,order,limit,offset){
    let url = '/artist/songs?id='+id+'&order='+order;
    if(limit!== undefined && offset!== undefined ) { url = '/artist/songs?'+id+'&limit=50'+'&offset='+offset}
    return request({
        url :url
    })
}
/*
获取歌手单曲
说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲

必选参数 : id: 歌手 id, 可由搜索接口获得

接口地址 : /artists

调用例子 : /artists?id=6452*/
export function artists(id){

    return request({
        url :'/artists?id='+id
    })
}
/*
获取歌手专辑
说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容

必选参数 : id: 歌手 id

可选参数 : limit: 取出数量 , 默认为 50

offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0

接口地址 : /artist/album

调用例子 : /artist/album?id=6452&limit=30 ( 周杰伦 )*/
export function artist_album(id,limit){
    return request({
        url :'/artist/album?id='+id+'&limit='+limit
    })
}
/*获取相似歌手
说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手

必选参数 : id: 歌手 id

接口地址 : /simi/artist

调用例子 : /simi/artist?id=6452 ( 对应和周杰伦相似歌手 )*/
export function simi_artist(id){
    return request({
        url :'/simi/artist?id='+id
    })
}
/*    获取相似歌单
说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌单

必选参数 : id: 歌曲 id

接口地址 : /simi/playlist

调用例子 : /simi/playlist?id=347230 ( 对应 ' 光辉岁月 ' 相似歌单 )*/
export function simi_playlist(id){
    return request({
        url :'/simi/playlist?id='+id
    })
}
/*相似 mv
说明 : 调用此接口 , 传入 mvid 可获取相似 mv

必选参数 : mvid: mv id

接口地址 : /simi/mv

调用例子 : /simi/mv?mvid=5436712*/
export function simi_mv(id){
    return request({
        url :'/simi/mv?mvid='+id
    })
}
/*
    获取相似音乐
说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌曲

必选参数 : id: 歌曲 id

接口地址 : /simi/song

调用例子 : /simi/song?id=347230 ( 对应 ' 光辉岁月 ' 相似歌曲 )*/
