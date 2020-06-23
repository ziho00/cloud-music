// IOS input issue
export const iOS_ScrollTop = function() {
  if (/iphone|ipod|ipad/i.test(navigator.appVersion)){
    if (
      document.documentElement.offsetHeight <=
        document.documentElement.clientHeight
    ) {
      document.body.scrollIntoView() // 回顶部
    }
  }
}

/**
 * 防抖
 * @param {*} cb 回调函数 
 * @param {*} delay 触发时间间隔
 * @param {*} immdeiate 是否立即执行
 */
export const debounce = (cb, delay = 500, immdeiate = false) => {
  let timer = null
  return function (...args) {
    let context = this
    timer && clearTimeout(timer)
    if (immdeiate){
      let doNow = !timer
      timer = setTimeout(() => {
        timer = null
        cb.apply(context, args)
      }, delay)
      doNow && cb(args)
    } else {
      timer = setTimeout(() => {
        cb.apply(context, args)
      }, delay)
    }
  }
}

/**
 * 节流
 * @param {*} cb 
 * @param {*} duration 
 */
export const throttle = (cb, duration = 500) => {
  var timer = null
  var pre = Date.now()
  return function() {
    var context = this
    var args = arguments
    var now = Date.now()
    var remaining = duration - now + pre
    timer && clearTimeout(timer)
    if (remaining <= 0) {
      cb.call(context, args)
      pre = Date.now()
    } else {
      timer = setTimeout(cb, remaining)
    }
  }
}

/**
 * 二分法查找当前播放歌词
 * @param {*} now 当前时间戳
 * @param {*} lyrics 歌词数组
 */
export const findLyricInList = (now, lyrics) => {
  // now += 0.5
  if (lyrics.length === 0 || lyrics === null ) { return }
  // 二分法找小于等于目标时间的最后一个元素
  let start = 0, end = lyrics.length - 1
  while (start <= end) {
    let mid = start + (end - start >> 1)
		if (lyrics[mid][0] <= now && (mid + 1) <= end && lyrics[mid + 1][0] > now) {
			return mid
		} else if (lyrics[mid][0] > now) {
			end = mid - 1
		} else {
			start = mid + 1
		}
  }
  return end
}


/**
 * 初始化 播放量
 * @param {*} playCount 播放量
 */
export const initPlayCount = (playCount) => {
  let y = playCount / 100000000
  let w = playCount / 10000
  if (y > 1) {
    return y.toFixed(1) + "亿"
  }
  if (w > 1) {
    return ~~(w) + "万"
  }
  return playCount
}

/**
 * 初始化收藏数量
 * @param {*} collectionCount 收藏数量
 */
export const initCollectionCount = (collectionCount) => {
  let y = collectionCount / 100000000
  let w = collectionCount / 10000
  if (y > 1) {
    return y.toFixed(2) + "亿"
  }
  if (w > 1) {
    return w.toFixed(1) + "万"
  }
  return collectionCount
}

/**
 * 初始化日期
 * @param {*} dateTime 时间戳
 */
export const initDate = (dateTime) => {
  const date = new Date(dateTime)
  return (date.getMonth() + 1) + "月" + date.getDate() + "日"
}

/**
 * 多个歌手的名字拼接
 * @param {*} artists 歌手数组
 */
export const initArtists = (artists) => {
  let ret = ""
  for (let i = 0, len = artists.length; i < len; i++) {
    ret += i === 0 ? artists[i].name : ("/" + artists[i].name)
  }
  return ret
}


/**
 * 初始化歌词
 * @param {*} lyric 
 */
export const initLyric = (lyric) => {
  if (!lyric) { return }
  let list = lyric.split("\n")
  if (list.length <= 0) { return [] }
  let lyricList = []
  let textReg = /([^\]]+$)/
  const compare = (a, b) => {
    return a[0] - b[0]
  }
  list.forEach((item) => {
    let timeReg = /\[(\d+):(\d+)\.(\d+)\]/g
    let time = []
    let textTime = timeReg.exec(item)
    while (textTime !== null) {
      time.push(textTime)
      textTime = timeReg.exec(item)
    }
    let text = textReg.exec(item)
    let lyricText = text && text[1] || ""
    for (let i = 0, l = time.length; i < l; i++) {
      let lyricTime = time[i][1] * 60 + time[i][2] * 1 + time[i][3] / Math.pow(10, time[i][3].length)
      lyricList.push([lyricTime, lyricText])
    }
  })
  lyricList.sort(compare)
  return lyricList
}

/**
 * 初始化歌曲的时间
 * 输入：100
 * 输出：01:40
 * @param {*} time 时间戳
 */
export const initTime = (time) => {
  let res = ""
  if (time > -1) {
    let min = ~~(time / 60)
    let sec = ~~(time % 60)
    if (min < 10) {
      min = "0" + min
    }
    if (sec < 10) {
      sec = "0" + ~~(sec)
    }
    res = min + ":" + sec
  }
  return res
}

export const find = (arr, target) => {
  let start = 0
  let end = arr.length
  while (start <= end) {
    if (arr[start] === target) {
      return start
    } else if (arr[end] === target) {
      return end
    }
    start++
    end--
  }
  return -1
}

export const addSearchRecord = (keywords) => {
  const storage = window.localStorage
  let searchHistories = JSON.parse(storage.getItem("searchHistories") || "[]")
  let index = find(searchHistories, keywords)
  if (index !== -1) {
    searchHistories.splice(index, 1)
  }
  searchHistories.unshift(keywords)
  storage.setItem("searchHistories", JSON.stringify(searchHistories))
}

export const isDef = (value) => value !== undefined && value !== null

export const isNumber = (value) => /^\d+(\.\d+)?$/.test(value)

export const addUnit = (value) => {
  if (!isDef(value)) {
    return
  }
  value = String(value)
  return isNumber(value) ? `${value}px` : value
}

export const classCreator = (list = [], Ctor) => {
  return list.reduce((acc, cur) => {
    acc.push(new Ctor(cur))
    return acc
  }, [])
}
