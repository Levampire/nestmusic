import {request} from 'network/Base_request';
/*说明 : 登录后调用此接口 , 可获取云盘数据 , 获取的数据没有对应 url, 需要再调用一 次 /song/url 获取 url

可选参数 :

limit : 返回数量 , 默认为 200

offset : 偏移数量，用于分页 , 如 :( 页数 -1)*200, 其中 200 为 limit 的值 , 默认为 0

接口地址 : /user/cloud

调用例子 : /user/cloud*/
export function user_cloud(limit,pageNo){
    return request({
        url:'/user/cloud?limit='+limit+'&pageNo='+pageNo
    })
}
