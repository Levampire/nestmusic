/*
  *时间秒转显示
  *输入时间秒数
  *返回时间 00：00：00
 */
export  function timeTrans (timenum) {
    let h =timenum/3600>=1? Math.floor(timenum/3600).toFixed(2):0;
    h = h<10?"0"+h:h
    let m = timenum/3600>=1? Math.floor(timenum%3600/60).toFixed(2):Math.floor(timenum/60);
    m = m<10?"0"+m:m
    let s = timenum/60>=1? Math.floor(timenum%60):timenum;
    s = s<10?"0"+s:s
    if(h>=1){
        return  h+':'+m+''+':'+s
    }
    else{
        return m+''+':'+s
    }
}
/*
  *显示时间转秒
  *输入时间 00：00：00
  *返回时间 秒： 12131213
 */
export  function timeTransBack (timeData) {
    let time = timeData.split(':')
    if(time.length===3){
        return parseInt(time[0])*3600+parseInt(time[1])*60+parseInt(time[2])
    }else if(time.length===2){
        return parseInt(time[0])*60+parseInt(time[1])
    }
}
/*
  *分析歌手数据
  *返回数据'歌手1、歌手2、'
  *输入数据歌手数据数组
 */
export  function artistsNameComB (artists) {
    // console.log(artists)
    let name =''
    artists.forEach(
        function (value,key){
            if(key<artists.length-1)
            {name += value.name+'、'}
            else{name += value.name}
        }
    )
    return name
}
/*
  *分析歌词数据
  *返回数据{时间节点：单句歌词内容}
  *输入数据 歌词文本lrc歌词
 */
export  function analysisLyrics (lyricsData) {
    const lyric = lyricsData.split('\n').filter(item =>
        item!=='')
    return lyric
}
/*
  *时间戳转换
  *输入数据 时间戳 Number
  *返回数据  例：2021.2.2
 */
export  function timeDateTrans (time) {
    let date = new Date(parseInt(time.toString().substr(0,time.length)));
    return date.getFullYear().toString() + '.' +
        (date.getMonth() + 1).toString() + '.' +
        date.getDate().toString()
}

