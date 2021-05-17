export  function timeTrans (timenum) {
    let h =timenum/3600>=1? Math.floor(timenum/3600):0;
    h = h<10?"0"+h:h
    let m = timenum/3600>=1? Math.floor(timenum%3600/60):Math.floor(timenum/60);
    m = m<10?"0"+m:m
    let s = timenum/60>=1? Math.floor(timenum%60):timenum;
    s = s<10?"0"+s:s
    if(h>=1){
        return h+':'+m+''+':'+s
    }
    else{
        return m+''+':'+s
    }
}
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
    return lyricsData.split('\n')
}
